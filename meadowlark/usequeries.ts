import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { InvestmentPreferences } from '../types';

export function useBackendHealth() {
  const { actor, isFetching } = useActor();
  
  return {
    isHealthy: !!actor && !isFetching,
    isFetching
  };
}

/**
 * Hook to calculate conservation score using GBIF API
 */
export function useCalculateConservationScore() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (location: string) => {
      if (!actor) throw new Error('Backend actor not initialized');
      
      console.log('[Conservation Score] Fetching GBIF data for location:', location);
      const response = await actor.calculateConservationScore(location, '', '');
      
      try {
        const parsed = JSON.parse(response);
        console.log('[Conservation Score] GBIF response:', parsed);
        
        // Extract species count and calculate score
        const speciesCount = parsed.count || parsed.results?.length || 0;
        const threatenedCount = parsed.threatened || 0;
        
        // Calculate conservation score (0-100) based on biodiversity
        const baseScore = Math.min(100, 50 + (speciesCount / 10));
        const threatenedBonus = threatenedCount > 0 ? 10 : 0;
        const score = Math.round(Math.min(100, baseScore + threatenedBonus));
        
        return {
          score,
          speciesCount,
          threatenedCount,
          source: 'GBIF'
        };
      } catch (error) {
        console.warn('[Conservation Score] Failed to parse GBIF response, using default:', error);
        return {
          score: 75,
          speciesCount: 0,
          threatenedCount: 0,
          source: 'default'
        };
      }
    }
  });
}

/**
 * Hook to calculate economic score using Open-Meteo API
 */
export function useCalculateEconomicScore() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (location: string) => {
      if (!actor) throw new Error('Backend actor not initialized');
      
      console.log('[Economic Score] Fetching climate data for location:', location);
      const response = await actor.calculateEconomicScore(location, '', '');
      
      try {
        const parsed = JSON.parse(response);
        console.log('[Economic Score] Open-Meteo response:', parsed);
        
        // Extract climate data
        const temperature = parsed.current?.temperature_2m || parsed.temperature || 15;
        const precipitation = parsed.current?.precipitation || parsed.precipitation || 50;
        
        // Calculate economic score (0-100) based on climate stability
        // Optimal temperature range: 10-25°C, optimal precipitation: 40-80mm
        const tempScore = Math.max(0, 100 - Math.abs(temperature - 17.5) * 3);
        const precipScore = Math.max(0, 100 - Math.abs(precipitation - 60) * 1.5);
        const score = Math.round((tempScore * 0.6 + precipScore * 0.4));
        
        return {
          score: Math.min(100, Math.max(0, score)),
          temperature,
          precipitation,
          source: 'Open-Meteo'
        };
      } catch (error) {
        console.warn('[Economic Score] Failed to parse Open-Meteo response, using default:', error);
        return {
          score: 70,
          temperature: 0,
          precipitation: 0,
          source: 'default'
        };
      }
    }
  });
}

/**
 * Normalizes an opportunity object to ensure all required fields exist
 */
function normalizeOpportunity(opp: any, index: number): any {
  if (!opp || typeof opp !== 'object') {
    console.warn('[Bedrock Normalizer] Invalid opportunity object:', opp);
    return null;
  }

  // Normalize title/name field - REQUIRED
  const title = opp.title || opp.name || opp.projectName || opp.project_name || 
                opp.opportunityName || opp.opportunity_name || opp.project || '';
  
  if (!title || title.trim() === '') {
    console.warn('[Bedrock Normalizer] Missing title for opportunity:', opp);
    return null;
  }
  
  // Normalize URL/link field - REQUIRED
  let url = opp.url || opp.link || opp.website || opp.verification_source || 
            opp.verificationSource || opp.source || opp.investmentUrl || 
            opp.investment_url || opp.href || opp.web || '';
  
  // Validate and clean URL
  if (url && url !== '#' && url.trim() !== '') {
    url = url.trim();
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it looks like a domain
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        // Invalid URL format
        console.warn('[Bedrock Normalizer] Invalid URL format:', url);
        url = '';
      }
    }
  } else {
    url = '';
  }
  
  // URL is required - if missing, reject this opportunity
  if (!url) {
    console.warn('[Bedrock Normalizer] Missing valid URL for opportunity:', title);
    return null;
  }
  
  // Normalize location field - REQUIRED for score calculation
  const location = opp.location || opp.region || opp.area || opp.country || 
                   opp.geographic_location || opp.geographicLocation || '';
  
  if (!location || location.trim() === '') {
    console.warn('[Bedrock Normalizer] Missing location for opportunity:', title);
    return null;
  }
  
  // Normalize description/relevance/reason field - OPTIONAL but recommended
  const description = opp.description || opp.relevance || opp.reason || 
                      opp.summary || opp.details || opp.overview || 
                      opp.about || opp.info || 
                      'Conservation investment opportunity aligned with your sustainability goals.';

  // Additional optional fields
  const region = opp.region || opp.location || opp.area || opp.country || '';
  const registry = opp.registry || opp.certification || opp.verifier || opp.certifier || '';
  const verified = opp.verified !== undefined ? opp.verified : (registry ? true : false);
  const sdgAlignment = opp.sdg_alignment || opp.sdgAlignment || opp.sdgs || '';
  const estimatedReturn = opp.estimated_return || opp.estimatedReturn || opp.return || '';
  const verificationSource = opp.verification_source || opp.verificationSource || url;

  return {
    title: title.trim(),
    url: url,
    location: location.trim(),
    description: description.trim(),
    region,
    registry,
    verified,
    sdg_alignment: sdgAlignment,
    estimated_return: estimatedReturn,
    verification_source: verificationSource,
    // Preserve any additional fields that might be useful
    ...opp
  };
}

/**
 * Validates that an opportunity has the minimum required fields
 * LENIENT: Only requires title, URL, and location
 */
function isValidOpportunity(opp: any): boolean {
  if (!opp || typeof opp !== 'object') {
    return false;
  }

  // Must have at least a title, URL, AND location
  const hasTitle = !!(opp.title && opp.title.trim());
  const hasUrl = !!(opp.url && opp.url.trim() && opp.url !== '#');
  const hasLocation = !!(opp.location && opp.location.trim());
  
  return hasTitle && hasUrl && hasLocation;
}

/**
 * Extracts JSON from various text formats including markdown code blocks
 */
function extractJSONFromText(text: string): any | null {
  // Try 1: Extract from markdown code blocks (```json ... ``` or ``` ... ```)
  const codeBlockPatterns = [
    /```json\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/i,
    /```\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/,
  ];

  for (const pattern of codeBlockPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      try {
        const parsed = JSON.parse(match[1]);
        console.log('[JSON Extractor] Successfully extracted from code block');
        return parsed;
      } catch (e) {
        console.warn('[JSON Extractor] Failed to parse code block match:', e);
      }
    }
  }

  // Try 2: Find JSON object or array anywhere in the text
  // Look for the largest valid JSON structure
  const jsonPatterns = [
    /\{[\s\S]*"opportunities"[\s\S]*\[[\s\S]*?\][\s\S]*?\}/,  // Object with opportunities array
    /\[[\s\S]*?\{[\s\S]*?"title"[\s\S]*?\}[\s\S]*?\]/,        // Array with title field
    /\[[\s\S]*?\{[\s\S]*?"name"[\s\S]*?\}[\s\S]*?\]/,         // Array with name field
    /\[[\s\S]*?\{[\s\S]*?"url"[\s\S]*?\}[\s\S]*?\]/,          // Array with url field
    /\{[\s\S]*?\}/,                                            // Any JSON object
    /\[[\s\S]*?\]/,                                            // Any JSON array
  ];

  for (const pattern of jsonPatterns) {
    const match = text.match(pattern);
    if (match && match[0]) {
      try {
        const parsed = JSON.parse(match[0]);
        console.log('[JSON Extractor] Successfully extracted JSON pattern');
        return parsed;
      } catch (e) {
        // Continue to next pattern
      }
    }
  }

  // Try 3: Clean up common issues and try parsing
  const cleanedText = text
    .replace(/^[^{\[]*/, '')  // Remove leading non-JSON characters
    .replace(/[^}\]]*$/, '')  // Remove trailing non-JSON characters
    .replace(/\n/g, ' ')      // Replace newlines with spaces
    .replace(/\r/g, '')       // Remove carriage returns
    .trim();

  if (cleanedText.startsWith('{') || cleanedText.startsWith('[')) {
    try {
      const parsed = JSON.parse(cleanedText);
      console.log('[JSON Extractor] Successfully parsed cleaned text');
      return parsed;
    } catch (e) {
      console.warn('[JSON Extractor] Failed to parse cleaned text:', e);
    }
  }

  return null;
}

/**
 * Parses text content that might contain JSON
 */
function parseTextContent(text: string): any {
  console.log('[Bedrock Parser] Parsing text content, length:', text.length);
  
  // Try direct JSON parse first
  try {
    const parsed = JSON.parse(text);
    console.log('[Bedrock Parser] Text content is valid JSON');
    
    // If it's an object with opportunities, return it
    if (parsed.opportunities && Array.isArray(parsed.opportunities)) {
      return parsed;
    }
    
    // If it's an array, wrap it
    if (Array.isArray(parsed)) {
      return { opportunities: parsed };
    }
    
    return parsed;
  } catch (e) {
    console.log('[Bedrock Parser] Text is not direct JSON, attempting extraction...');
  }

  // Try to extract JSON from text
  const extracted = extractJSONFromText(text);
  if (extracted) {
    // Normalize the extracted data
    if (extracted.opportunities && Array.isArray(extracted.opportunities)) {
      return extracted;
    }
    if (Array.isArray(extracted)) {
      return { opportunities: extracted };
    }
    return extracted;
  }

  console.warn('[Bedrock Parser] Could not extract valid JSON from text');
  throw new Error('Response does not contain valid JSON data');
}

/**
 * Parses the content from various Bedrock response formats
 */
function parseBedrockContent(content: any): any {
  // Format 1: Claude v2 - { "completion": "text..." }
  if (content.completion) {
    console.log('[Bedrock Parser] Found completion field (Claude v2 format)');
    return parseTextContent(content.completion);
  }
  
  // Format 2: Claude 3+ - { "content": [{ "text": "..." }] }
  if (content.content && Array.isArray(content.content)) {
    console.log('[Bedrock Parser] Found content array (Claude 3+ format)');
    const textContent = content.content.find((item: any) => item.text || item.type === 'text');
    if (textContent && textContent.text) {
      return parseTextContent(textContent.text);
    }
  }
  
  // Format 3: Converse API - { "output": { "message": { "content": [...] } } }
  if (content.output?.message?.content) {
    console.log('[Bedrock Parser] Found output.message.content (Converse API format)');
    const messageContent = content.output.message.content;
    if (Array.isArray(messageContent)) {
      const textContent = messageContent.find((item: any) => item.text || item.type === 'text');
      if (textContent && textContent.text) {
        return parseTextContent(textContent.text);
      }
    }
  }
  
  // Format 4: Direct opportunities array
  if (content.opportunities && Array.isArray(content.opportunities)) {
    console.log('[Bedrock Parser] Found opportunities array directly');
    return content;
  }
  
  // Format 5: Direct array (might be opportunities)
  if (Array.isArray(content)) {
    console.log('[Bedrock Parser] Content is direct array');
    return { opportunities: content };
  }
  
  // Format 6: outputText field (some Lambda wrappers use this)
  if (content.outputText) {
    console.log('[Bedrock Parser] Found outputText field');
    return parseTextContent(content.outputText);
  }

  // Format 7: message field with role and content
  if (content.message?.content) {
    console.log('[Bedrock Parser] Found message.content field');
    if (typeof content.message.content === 'string') {
      return parseTextContent(content.message.content);
    }
    if (Array.isArray(content.message.content)) {
      const textContent = content.message.content.find((item: any) => item.text || item.type === 'text');
      if (textContent && textContent.text) {
        return parseTextContent(textContent.text);
      }
    }
  }

  // Format 8: results field (alternative naming)
  if (content.results && Array.isArray(content.results)) {
    console.log('[Bedrock Parser] Found results array');
    return { opportunities: content.results };
  }

  // Format 9: items field (alternative naming)
  if (content.items && Array.isArray(content.items)) {
    console.log('[Bedrock Parser] Found items array');
    return { opportunities: content.items };
  }
  
  console.warn('[Bedrock Parser] Unknown content format, returning as-is:', content);
  return content;
}

/**
 * Attempts to parse Bedrock response handling multiple possible formats
 */
function parseBedrockResponse(response: string): any {
  console.log('[Bedrock Parser] Raw response received, length:', response.length);
  console.log('[Bedrock Parser] First 500 chars:', response.substring(0, 500));
  
  try {
    // First attempt: Parse as JSON
    const parsed = JSON.parse(response);
    console.log('[Bedrock Parser] Successfully parsed JSON, keys:', Object.keys(parsed));
    
    // Handle wrapped body format
    if (parsed.body) {
      console.log('[Bedrock Parser] Found body field, attempting to parse...');
      const bodyContent = typeof parsed.body === 'string' 
        ? JSON.parse(parsed.body) 
        : parsed.body;
      return parseBedrockContent(bodyContent);
    }
    
    // Handle direct parsed content
    return parseBedrockContent(parsed);
    
  } catch (parseError) {
    console.warn('[Bedrock Parser] Initial JSON parse failed:', parseError);
    
    // Second attempt: Try to extract JSON from text
    const extracted = extractJSONFromText(response);
    if (extracted) {
      return parseBedrockContent(extracted);
    }
    
    // Third attempt: Treat as direct text response
    console.log('[Bedrock Parser] Treating as direct text response');
    return parseTextContent(response);
  }
}

/**
 * Validates and normalizes the parsed response
 * LENIENT: Accepts 2-6 opportunities with title, URL, and location
 */
function validateAndNormalizeOpportunities(data: any): { opportunities: any[] } | null {
  if (!data || typeof data !== 'object') {
    console.warn('[Bedrock Validator] Data is not an object');
    return null;
  }
  
  let opportunities = data.opportunities || data;
  
  // If it's not an array, try to extract opportunities from various fields
  if (!Array.isArray(opportunities)) {
    console.log('[Bedrock Validator] Opportunities is not an array, attempting to extract...');
    
    // Try common field names
    const possibleFields = ['results', 'items', 'projects', 'investments', 'data', 'list'];
    for (const field of possibleFields) {
      if (data[field] && Array.isArray(data[field])) {
        opportunities = data[field];
        console.log(`[Bedrock Validator] Found opportunities in '${field}' field`);
        break;
      }
    }
    
    // If still not an array, wrap single object
    if (!Array.isArray(opportunities) && typeof opportunities === 'object') {
      console.log('[Bedrock Validator] Wrapping single object as array');
      opportunities = [opportunities];
    } else if (!Array.isArray(opportunities)) {
      console.warn('[Bedrock Validator] Could not extract array from data');
      return null;
    }
  }
  
  if (opportunities.length === 0) {
    console.warn('[Bedrock Validator] Opportunities array is empty');
    return null;
  }
  
  // Normalize and validate each opportunity
  const normalizedOpportunities = opportunities
    .map((opp: any, index: number) => normalizeOpportunity(opp, index))
    .filter((opp: any) => opp !== null && isValidOpportunity(opp));
  
  if (normalizedOpportunities.length === 0) {
    console.warn('[Bedrock Validator] No valid opportunities after normalization');
    return null;
  }
  
  // LENIENT: Accept 2-6 opportunities (changed from strict 3-5)
  if (normalizedOpportunities.length < 2) {
    console.warn('[Bedrock Validator] Only found', normalizedOpportunities.length, 'opportunity, need at least 2');
    return null;
  }
  
  // Limit to maximum 6 opportunities (changed from 5)
  const finalOpportunities = normalizedOpportunities.slice(0, 6);
  
  console.log('[Bedrock Validator] Validation passed, returning', finalOpportunities.length, 'valid opportunities');
  return { opportunities: finalOpportunities };
}

export function useGenerateInvestmentOpportunities() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: InvestmentPreferences) => {
      if (!actor) throw new Error('Backend actor not initialized');

      console.log('[Investment Query] Starting request with preferences:', preferences);

      // Construct the request body for AWS Bedrock with explicit field requirements
      const requestBody = JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4096,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: `You are an expert in conservation finance and sustainable investment opportunities. 
Based on the following investment preferences, provide between 3 to 5 verified investment opportunities in valid JSON format.

Investment Preferences:
- Region: ${preferences.region}
- SDG Goals: ${preferences.sdgs.join(', ')}
- Risk Tolerance: ${preferences.riskTolerance}
- Investment Horizon: ${preferences.investmentHorizon}
- Minimum Return: ${preferences.minimumReturn}%
- Investment Amount: $${preferences.investmentAmount}

CRITICAL REQUIREMENTS - Each opportunity MUST include ALL of these fields:
1. "title": A specific, descriptive project name (REQUIRED)
2. "url": A valid, working URL to a real conservation project or registry (REQUIRED)
3. "location": Geographic coordinates or specific location name for the project (REQUIRED - e.g., "Amazon Rainforest, Brazil" or "lat:40.7128,lon:-74.0060")
4. "description": Detailed explanation of the opportunity (REQUIRED)
5. "sdg_alignment": Which SDG goals this project aligns with (REQUIRED - e.g., "13, 15")
6. "estimated_return": Expected annual return percentage (REQUIRED - e.g., "8-12%")
7. "region": Geographic region (REQUIRED - e.g., "South America")
8. "verification_source": Source of verification or certification (REQUIRED - e.g., "Verra Registry")

Use actual websites like:
- Verra Registry: https://registry.verra.org/
- Gold Standard: https://www.goldstandard.org/
- Conservation International: https://www.conservation.org/
- The Nature Conservancy: https://www.nature.org/
- World Wildlife Fund: https://www.worldwildlife.org/
- Or other legitimate conservation finance platforms

Return ONLY a JSON object with this exact structure (no markdown, no explanations, no extra text):
{
  "opportunities": [
    {
      "title": "Specific Project Name",
      "url": "https://actual-website.com/project-page",
      "location": "Specific geographic location or coordinates",
      "description": "Detailed description of the investment opportunity",
      "sdg_alignment": "13, 15",
      "estimated_return": "8-12%",
      "region": "Geographic region",
      "verification_source": "Verra Registry"
    }
  ]
}

IMPORTANT:
- Provide 3-5 opportunities
- Each MUST have ALL 8 required fields: title, url, location, description, sdg_alignment, estimated_return, region, verification_source
- URLs must be real and working (no placeholders like example.com)
- Location should be specific enough for biodiversity and climate data lookup
- Return ONLY the JSON object, no other text`
          }
        ]
      });

      console.log('[Investment Query] Request body prepared');

      try {
        // Call the backend which will make the HTTP outcall to AWS Bedrock
        const response = await actor.calculateAllScores(requestBody, '', '');
        console.log('[Investment Query] Received response from backend, length:', response.length);
        
        // Parse the response handling multiple Bedrock formats
        const parsedResponse = parseBedrockResponse(response);
        console.log('[Investment Query] Parsed response:', parsedResponse);
        
        // Validate and normalize the parsed response (now accepts 2-6 opportunities)
        const validatedData = validateAndNormalizeOpportunities(parsedResponse);
        
        if (!validatedData || !validatedData.opportunities || validatedData.opportunities.length < 2) {
          console.error('[Investment Query] Validation failed - need 2-6 valid opportunities with title, URL, and location, got:', validatedData?.opportunities?.length || 0);
          throw new Error('AI response did not contain valid investment opportunities with required fields (title, URL, and location)');
        }
        
        console.log('[Investment Query] Successfully validated', validatedData.opportunities.length, 'opportunities');
        return validatedData;
        
      } catch (error) {
        console.error('[Investment Query] Error during request:', error);
        
        // Provide detailed error information
        if (error instanceof Error) {
          throw new Error(`Failed to generate opportunities: ${error.message}`);
        }
        
        throw new Error('Failed to generate opportunities: Unknown error');
      }
    },
    onSuccess: (data) => {
      console.log('[Investment Query] Mutation successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['investment-opportunities'] });
    },
    onError: (error) => {
      console.error('[Investment Query] Mutation failed:', error);
    }
  });
}
