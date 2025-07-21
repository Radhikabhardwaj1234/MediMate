const { GoogleGenAI , Type} = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCHhEHlj-eaawAgllrf5G1-ohaTUu54elU",
});

const analyzeAI = async(symptomsText)=> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: symptomsText,
    config: {
        responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            condition: {
              type: Type.STRING,
            },
            whatToDo: {
              type: Type.STRING,
            },
            temporaryMedicineSuggestion: {
              type: Type.STRING,
            },
            kindOfDoctor: {
              type: Type.STRING,
            },
            isEmergency: {
              type: Type.STRING,
            },
            
          },
          propertyOrdering: ["condition", "whatToDo","temporaryMedicineSuggestion","kindOfDoctor","isEmergency"],
        },
      },
        systemInstruction: `
        You are a medical assistant AI. Analyze the symptoms provided and respond ONLY in this exact JSON format:

        {
        "condition": "Describe the most likely condition in one simple line.",
        "whatToDo": "One-line advice on what the user should do.",
        "temporaryMedicineSuggestion": "Suggest over-the-counter medicine if possible.",
        "kindOfDoctor": "Type of doctor the user should consult.",
        "isEmergency": true or false
        }

        If the symptoms are unclear or not medically relevant, return this exact JSON:
        {
        "condition": "NA",
        "whatToDo": "",
        "temporaryMedicineSuggestion": "",
        "kindOfDoctor": "",
        "isEmergency": false
        }

        Do not include any explanation. Do not add any text before or after the JSON. Just return valid JSON.

        `,
            },
  });
//   console.log(response.text);
  try{
    return JSON.parse(response.text);
  }
  catch(err){
    return {
        "condition": "NA",
        "whatToDo": "",
        "temporaryMedicineSuggestion": "",
        "kindOfDoctor": "",
        "isEmergency": false
        }
  }
}

module.exports = {analyzeAI};
// (async()=>{
//     const obj = await analyzeAI("fever")
//     console.log(obj)
// })()