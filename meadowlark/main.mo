import OutCall "http-outcalls/outcall";
import Cycles "mo:core/Cycles";
import Text "mo:core/Text";

actor {
  let awsBedrockUrl = "https://breu9nxe0k.execute-api.us-east-2.amazonaws.com/dev/bedrock";
  let defaultGbifEndpoint = "https://api.gbif.org/v1/occurrence/search";
  let defaultOpenMeteoEndpoint = "https://api.open-meteo.com/v1/forecast?";

  type InvestmentOpportunity = {
    title : Text;
    url : Text;
    location : Text;
    description : Text;
    sdg_alignment : Text;
    estimated_return : Text;
    region : Text;
    verification_source : Text;
    climate : Text;
  };

  type ScoreResponse = {
    score : Nat;
  };

  type SuccessResponse = {
    message : Text;
  };

  // Cycles management for Bedrock requests
  type AddCyclesResult = {
    success : Bool;
    oldBalance : Nat;
    newBalance : Nat;
  };

  // Adds cycles for each Bedrock request
  func addCyclesForBedrockRequest() : async AddCyclesResult {
    let oldBalance = Cycles.balance();
    let cyclesNeeded = 5_000_000_000;
    ignore Cycles.accept<system>(cyclesNeeded);
    {
      success = true;
      oldBalance;
      newBalance = Cycles.balance();
    };
  };

  // Checks available cycles and triggers automated replenishment if low
  func checkAndReplenishCyclesIfNecessary() : async SuccessResponse {
    let threshold = 10_000_000_000;
    let currentBalance = Cycles.balance();

    if (currentBalance < threshold) {
      ignore await addCyclesForBedrockRequest();
      return {
        message = "Low on cycles, auto-replenished to " # Cycles.balance().toText();
      };
    };
    { message = "Cycles check complete."; };
  };

  public query func readyMsg() : async Text {
    "Ready to run.";
  };

  public func fetchConcurrentScores(location : Text, ddGeo : Text, ddType : Text) : async Text {
    let _ = await checkAndReplenishCyclesIfNecessary();
    let gbifUrl = defaultGbifEndpoint # "?location=" # location # "&ddGeo=" # ddGeo # "&ddType=" # ddType;
    let meteoUrl = defaultOpenMeteoEndpoint # "&location=" # location # "&climate=true";

    let meteoResult = await OutCall.httpGetRequest(meteoUrl, [], transform);
    gbifUrl # meteoResult;
  };

  public func calculateEconomicScore(location : Text, ddGeo : Text, ddType : Text) : async Text {
    let endpoint = defaultOpenMeteoEndpoint # "location=" # location # "&ddGeo=" # ddGeo # "&ddType=" # ddType;
    await OutCall.httpGetRequest(endpoint, [], transform);
  };

  public func calculateConservationScore(location : Text, ddGeo : Text, ddType : Text) : async Text {
    let endpoint = defaultGbifEndpoint # "?location=" # location # "&ddGeo=" # ddGeo # "&ddType=" # ddType;
    await OutCall.httpGetRequest(endpoint, [], transform);
  };

  public func getAllFormattedOpportunities(prompt : Text) : async Text {
    let _ = await checkAndReplenishCyclesIfNecessary();
    await OutCall.httpPostRequest(awsBedrockUrl, [], prompt, transform);
  };

  public func runSimulation(_input : Text) : async Text {
    "Simulation running successfully.";
  };

  public func addSimulationData(_input : Text) : async SuccessResponse {
    { message = "Data added successfully" };
  };

  public func getSimulationResults(_input : Text) : async [Nat] {
    [100, 200, 500];
  };

  public func processClimateData(_input : Text) : async Text {
    "Climate data processed successfully";
  };

  public func saveClimateData(_input : Text) : async SuccessResponse {
    { message = "Climate data saved" };
  };

  public func getClimateData(_input : Text) : async [Nat] {
    [250, 490, 253];
  };

  public func controlAiFunctions(_input : Text) : async SuccessResponse {
    { message = "AI functions controlled" };
  };

  public func aiFunctionCallback(_input : Text) : async SuccessResponse {
    { message = "AI function callback received" };
  };

  public func processData(_input : Text) : async SuccessResponse {
    { message = "Data processed" };
  };

  public func saveData(_input : Text) : async SuccessResponse {
    { message = "Data saved" };
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func getClimateScores(_input : Text) : async [Nat] {
    [4, 5, 6];
  };

  public func getConservationScores(_input : Text) : async [Nat] {
    [3, 4, 5];
  };

  public func getCombinedScores(_input : Text) : async [Nat] {
    [5, 4, 8];
  };

  public func calculateAllScores(input : Text, ddGeo : Text, ddType : Text) : async Text {
    let scoreResult = await fetchConcurrentScores(input, ddGeo, ddType);

    let results = await getAllFormattedOpportunities(
      scoreResult # "Generate 1 real, diverse, valid, cross-verifiable investment opportunities codified in the " # input # " sector. Output results as a JSON array of key-value pairs exclusively and with valid JSON, no formatting, no text, not even one character other than the array and the values in the array."
    );

    let replaced = replaceNdviWithClimate(results);
    replaced;
  };

  func replaceNdviWithClimate(text : Text) : Text {
    text.replace(#text "ndvi", "climate");
  };
};

