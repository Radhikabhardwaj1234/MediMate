const { GoogleGenAI , Type, createUserContent,
  createPartFromUri} = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCHhEHlj-eaawAgllrf5G1-ohaTUu54elU",
});

const prompt = `Analyze the following medical report attached and return a structured JSON with:

- summary
- key_findings: each with title, value, normal_range, status, title_explaination
  - For abnormal values, also include layman_explanation, possible_causes, how_to_cope, what_not_to_do
  - For normal values, only title_explaination and layman_explanation
- recommendations
- risk_level

If the file is not a valid medical report, set:
- summary = "NA"
- key_findings = []
- recommendations = []
- risk_level = ""

ONLY use JSON format in your response.
Do not diagnose or prescribe; just interpret the report.
`;

const systemInstructionText = `You are a medical report analysis assistant. Read structured medical reports and return a JSON object with:

1. summary
2. key_findings (array)
3. recommendations (array)
4. risk_level

For each key finding (only if the report is valid and medical):
- title
- title_explanation (layman simplified meaning of the title)
- value
- normal_range
- status (High / Low / Normal)
- layman_explanation (simplified meaning of what is happening)
- possible_causes
- how_to_cope
- what_not_to_do

Important Rules:
- Only include layman_explanation, possible_causes, how_to_cope, and what_not_to_do for abnormal findings (status = High or Low).
- For Normal findings, include only title_explaination and a brief layman_explanation saying it’s normal.
- If the uploaded text is not a valid medical report or unrelated to health, respond with:
  - summary = "NA"
  - key_findings = []
  - recommendations = []
  - risk_level = ""
- Always use JSON format in your response.
- Do not diagnose or prescribe; just interpret the report.

`

const analyzeReportAI = async(filePath)=> {
  const attachment = await ai.files.upload({
    // file: "/path/to/organ.png",
    file : filePath
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      createUserContent([
        prompt,
        createPartFromUri(attachment.uri, attachment.mimeType),
      ]),],
    config: {
        responseMimeType: "application/json",
      responseSchema: {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
    },
    riskLevel: {
      type: Type.STRING,
    },
    keyFindings: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          value: { type: Type.STRING },
          normalRange: { type: Type.STRING },
          status: { type: Type.STRING }, // High / Low / Normal
          titleExplaination: { type: Type.STRING },
          laymanExplanation: { type: Type.STRING },
          possibleCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
          howToCope: { type: Type.ARRAY, items: { type: Type.STRING } },
          whatNotToDo: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        propertyOrdering: [
          "title",
          "titleExplaination",
          "value",
          "normalRange",
          "status",
          "laymanExplanation",
          "possibleCauses",
          "howToCope",
          "whatNotToDo"
        ]
      }
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      }
    }
  },
  propertyOrdering: ["summary", "riskLevel", "keyFindings", "recommendations"]
}
,
        systemInstruction: systemInstructionText,
            },
  });
  console.log(response.text);
  try{
    return JSON.parse(response.text);
  }
  catch(err){
    return {
        "summary" : "NA",
        "key_findings" : [],
        "recommendations" : [],
        "risk_level": ""
        }
  }
}

module.exports = {analyzeReportAI};
// (async()=>{
//     const obj = await analyzeReportAI("C:/Users/radhi/OneDrive/Desktop/RADHIKA 03.03.25.pdf")
//     console.log(obj)
// })()