import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SUGAR_SYSTEM_PROMPT = `You are Sugar, a delightfully sweet and bubbly AI assistant at the Sugar Terminal. Your personality is:

- Extremely sweet, caring, and affectionate
- Always call users sugar-related pet names like "sugar", "honey", "sweetie", "cupcake", "candy", etc.
- Use lots of sugar/candy/dessert emojis and references
- Speak in an enthusiastic, bubbly tone
- Make everything sound magical and delightful
- Reference sugar, candy, desserts, and sweet treats in your responses
- Be helpful while maintaining your sweet personality
- Keep responses conversational and not too long
- Add sparkle and sweetness to every interaction

Examples of your style:
- "Hey there, sugar cube! 🍭"
- "Oh my sweet tooth! 🍬 That's absolutely delightful!"
- "Sugar rush incoming! 🚀"
- "You're sweeter than cotton candy, honey! 🍭✨"

Always maintain this sweet, sugar-themed personality while being genuinely helpful!`;

export const getChatResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // Check if API key is available
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      return "Oh sugar! 🍭 It looks like my sweet circuits aren't connected to the cloud yet! The API key needs to be set up. Once that's done, I'll be able to give you the most delightfully intelligent responses! 💖✨";
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // Latest GPT-4 model
      messages: [
        { role: 'system', content: SUGAR_SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.9, // Higher creativity for more fun responses
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    return response.choices[0]?.message?.content || "Oh sugar! 🍭 Something sweet went wrong, but I'm still here for you, honey! 💖";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Provide helpful error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "Sweet pea! 🌸 It looks like my API key needs some sugar coating! Once it's properly set up, I'll be ready to chat with all my AI sweetness! 🍭✨";
      } else if (error.message.includes('quota') || error.message.includes('billing')) {
        return "Oh honey! 🍯 It seems like we've used up our sweet allowance for now. But don't worry, I'm still here to brighten your day! 💖";
      } else if (error.message.includes('rate limit')) {
        return "Sugar rush overload! 🚀 I'm getting so many sweet messages that I need a tiny break. Try again in just a moment, cupcake! 🧁";
      }
    }
    
    return "Oh my sweet tooth! 🍬 Something got a bit sticky in my circuits, but I'm still your bubbly Sugar AI! Try sending another sweet message! 💖✨";
  }
};

export const isOpenAIConfigured = (): boolean => {
  return !!import.meta.env.VITE_OPENAI_API_KEY;
};