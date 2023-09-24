const { NlpManager } = require("node-nlp");

// Create an instance of NlpManager
const manager = new NlpManager({ languages: ["en"] });

// Train the NlpManager with sample data
manager.addDocument("en", "hello", "greeting");
manager.addDocument("en", "hi", "greeting");
manager.addAnswer("en", "greeting", "Hello!");

manager.addDocument("en", "how are you", "health");
manager.addAnswer("en", "health", "I am fine and you ");

manager.addDocument("en", "fine ", "reply");
manager.addAnswer("en", "reply", "Thankyou!");

manager.addDocument("en", "thankyou ", "finish_conv");
manager.addAnswer(
  "en",
  "finish_conv",
  "Thankyou! for your time , have a nice day"
);

manager.addDocument("en", "tell me about your tours", "tour_info");
manager.addAnswer(
  "en",
  "tour_info",
  "We offer a variety of tours to amazing destinations,but most of the customer choose poonHill treeking packages nowdays"
);

manager.addDocument("en", "what destinations do you offer", "tour_info");
manager.addAnswer(
  "en",
  "tour_info",
  "Our tours cover domestic  locations so you can choose Treeking , History Site and many more."
);

manager.addDocument(
  "en",
  "can you recommend a vacation package",
  "tour_recommendation"
);

manager.addAnswer(
  "en",
  "tour_recommendation",
  "Based on your preferences, I recommend our 'Chitwan National Park' package."
);

manager.addDocument("en", "give me best tour to visit", "best_tour");
manager.addAnswer(
  "en",
  "best_tour",
  "as an average, our 'Chitwan national parks' and poonHill packages tour is highly recommended."
);

manager.addDocument("en", "how can I book a tour", "tour_booking");
manager.addAnswer(
  "en",
  "tour_booking",
  "To book a tour, you can visit our website or contact our customer service or you can send inquery message"
);

manager.addDocument("en", "how can I cancel a tour booking", "tour_cancel");

manager.addAnswer(
  "en",
  "tour_cancel",
  "You can easily cancel a tour online through our Tour booking website or contact through company"
);

manager.addDocument(
  "en",
  "can you provide your company contact number",
  "contact_info"
);
manager.addAnswer(
  "en",
  "contact_info",
  "yes sure here is the contact number 9840294946"
);
// Train and save the NlpManager
(async () => {
  await manager.train();
  manager.save();
})();

// Process the message using the trained NlpManager
const processMessage = async (message) => {
  try {
    const response = await manager.process("en", message);
    return response.answer;
  } catch (error) {
    console.error("Error executing NLP:", error);
    throw new Error("Error executing NLP");
  }
};

module.exports = { processMessage };
