import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

interface ChatResponse {
    fulfillmentText: string;
    payload?: {
        navigation?: string;
        data?: any;
    };
}

@Injectable()
export class ChatbotService {
    private prisma: PrismaClient;
    private groqApiKey: string;

    constructor() {
        this.prisma = new PrismaClient();
        this.groqApiKey = process.env.GROQ_API_KEY || '';

        if (this.groqApiKey) {
            console.log('Chatbot ready (Groq AI)');
        } else {
            console.warn('GROQ_API_KEY not set - using keyword detection only');
        }
    }

    async processWebhook(request: any): Promise<ChatResponse> {
        const queryText = request.queryResult?.queryText || request.message || '';
        console.log('User message:', queryText);

        if (!queryText.trim()) {
            return {
                fulfillmentText:
                    'Ayubowan! Welcome to Ayubowan Connect. I can help you explore experiences, navigate the platform, or answer questions. How can I help?',
            };
        }

        // check for keyword-based navigation first
        const navigationResponse = this.checkNavigationIntent(queryText.toLowerCase());
        if (navigationResponse) {
            return navigationResponse;
        }

        // try matching a search intent against the database
        const searchResponse = await this.checkSearchIntent(queryText.toLowerCase());
        if (searchResponse) {
            return searchResponse;
        }

        // fall back to Groq AI for general conversation
        if (this.groqApiKey) {
            try {
                const aiResponse = await this.askGroq(queryText);
                return { fulfillmentText: aiResponse };
            } catch (error) {
                console.error('Groq AI error:', error);
            }
        }

        // generic fallback if AI is unavailable
        return {
            fulfillmentText:
                "I'm here to help with Ayubowan Connect! You can ask me about:\n\n🛍️ Exploring the marketplace\n🗺️ Planning a trip\n📅 Booking experiences\n🍽️ Finding food & culture experiences\n❓ How the platform works\n\nJust type what you'd like to do!",
        };
    }

    // matches common keywords to instant navigation or canned responses

    private checkNavigationIntent(text: string): ChatResponse | null {
        if (/\b(hi|hello|hey|hii+|howdy|greetings?|ayubowan|ola|sup|yo|good\s*(morning|afternoon|evening|day))\b/.test(text)) {
            return {
                fulfillmentText:
                    'Ayubowan! 🙏 Welcome to Ayubowan Connect, your gateway to authentic Sri Lankan cultural experiences. How can I help you today?\n\nYou can ask me to:\n🛍️ Browse the marketplace\n🗺️ Plan a trip\n📅 Book an experience\n🍽️ Find food experiences',
            };
        }

        if (/\b(marketplace|browse|shop|explore|listings?|catalog|products?|see\s+what|check\s+out|available)\b/.test(text)) {
            return {
                fulfillmentText: 'Sure! Taking you to our marketplace where you can discover amazing Sri Lankan cultural experiences! 🛍️',
                payload: { navigation: '/marketplace' },
            };
        }

        if (/\b(plan|trip|itinerary|planner|journey|travel|schedule)\b/.test(text)) {
            return {
                fulfillmentText: 'Let me take you to our AI Trip Planner! It will create a personalized cultural itinerary just for you! 🗺️',
                payload: { navigation: '/ai' },
            };
        }

        if (/\b(book|booking|reserve|reservation|purchase|buy|checkout|pay|payment)\b/.test(text)) {
            return {
                fulfillmentText:
                    "Booking on Ayubowan Connect is easy! Here's how:\n\n1️⃣ Browse the marketplace and pick an experience\n2️⃣ Choose your date and number of guests\n3️⃣ Add to cart or book directly\n4️⃣ Complete payment securely\n5️⃣ Get instant confirmation! ✅\n\nWant me to take you to the marketplace to find something?",
            };
        }

        if (
            /\b(what\s*(is|are)|about|tell\s*me|info|who\s*(made|built|created))\b/.test(text) &&
            /\b(this|site|platform|ayubowan|website|app|service|you)\b/.test(text)
        ) {
            return {
                fulfillmentText:
                    'Ayubowan Connect is a Sri Lankan cultural experience marketplace! 🇱🇰\n\nWe connect travelers with authentic local experiences including:\n\n🎭 Cultural workshops & tours\n🍽️ Traditional food experiences\n🎨 Arts and crafts sessions\n🎉 Festival & event access\n🗺️ AI-powered trip planning\n\nOur platform supports local vendors and preserves Sri Lankan cultural heritage while giving visitors unforgettable experiences!',
            };
        }

        if (/\b(help|assist|support|guide|how\s*(to|do|can)|what\s*can)\b/.test(text)) {
            return {
                fulfillmentText:
                    "I can help you with lots of things! Here's what I can do:\n\n🛍️ Take you to the marketplace — try \"show me the marketplace\"\n🗺️ Plan a trip — try \"plan my trip\"\n📅 Help with bookings — try \"how do I book\"\n🍽️ Find experiences — try \"find food in Kandy\"\n🎉 Find events — try \"show me events\"\n\nOr just ask me anything about Sri Lanka and Ayubowan Connect! 😊",
            };
        }

        return null;
    }

    // extracts category/location from the message and queries the DB

    private async checkSearchIntent(text: string): Promise<ChatResponse | null> {
        // only proceed if the message contains a search-related word
        if (!/\b(food|experience|workshop|tour|culture|cultural|arts?|craft|festival|event|show\s*me|find|search|discover|recommend)\b/.test(text)) {
            return null;
        }

        let category: string | undefined;
        if (/\b(food|cuisine|dining|eat|restaurant|cook)\b/.test(text)) category = 'food';
        else if (/\b(culture|cultural|heritage|tradition)\b/.test(text)) category = 'culture';
        else if (/\b(workshop|class|learn|craft|arts?)\b/.test(text)) category = 'workshop';
        else if (/\b(tour|sightseeing|visit)\b/.test(text)) category = 'tour';
        else if (/\b(festival|event|celebration)\b/.test(text)) category = 'events';

        // map known city names to their proper-cased versions
        let location: string | undefined;
        const cities: Record<string, string> = {
            kandy: 'Kandy', colombo: 'Colombo', galle: 'Galle',
            jaffna: 'Jaffna', ella: 'Ella', 'nuwara eliya': 'Nuwara Eliya',
            sigiriya: 'Sigiriya', anuradhapura: 'Anuradhapura',
            trincomalee: 'Trincomalee', matara: 'Matara',
        };
        for (const [key, value] of Object.entries(cities)) {
            if (text.includes(key)) { location = value; break; }
        }

        return this.searchExperiences(category, location);
    }

    private async searchExperiences(category?: string, location?: string): Promise<ChatResponse> {
        try {
            const where: any = { visibilityStatus: 'PUBLISHED' };

            if (category) {
                const cat = await this.prisma.listingCategory.findFirst({
                    where: { categoryName: { contains: category, mode: 'insensitive' } },
                });
                if (cat) where.categoryId = cat.id;
            }

            if (location) {
                where.location = {
                    OR: [
                        { city: { contains: location, mode: 'insensitive' } },
                        { district: { contains: location, mode: 'insensitive' } },
                        { province: { contains: location, mode: 'insensitive' } },
                    ],
                };
            }

            const listings = await this.prisma.listing.findMany({
                where,
                take: 5,
                orderBy: { ratingAverage: 'desc' },
                include: { category: true, location: true, vendor: true },
            });

            if (listings.length === 0) {
                return {
                    fulfillmentText: `I couldn't find any ${category || 'experiences'} ${location ? `in ${location}` : ''} right now. Want to explore the full marketplace instead?`,
                    payload: { navigation: '/marketplace' },
                };
            }

            const summary = listings
                .map((l, i) => `${i + 1}. **${l.title}** by ${l.vendor.businessName} — LKR ${l.priceMin}`)
                .join('\n');

            return {
                fulfillmentText: `I found ${listings.length} great ${category || 'experiences'} ${location ? `in ${location}` : ''}! 🎉\n\n${summary}\n\nWant to explore these in the marketplace?`,
                payload: { navigation: '/marketplace' },
            };
        } catch (error) {
            console.error('DB search error:', error);
            return {
                fulfillmentText: "I'm having trouble searching right now. Let me take you to the marketplace instead!",
                payload: { navigation: '/marketplace' },
            };
        }
    }

    // sends the user message to Groq (Llama 3.1) with the system prompt

    private async askGroq(userMessage: string): Promise<string> {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.groqApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: this.getSystemPrompt() },
                    { role: 'user', content: userMessage },
                ],
                max_tokens: 300,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    private getSystemPrompt(): string {
        return `You are the Ayubowan Connect AI Assistant — a friendly, knowledgeable chatbot for a Sri Lankan cultural experience marketplace.

ABOUT AYUBOWAN CONNECT:
Ayubowan Connect is a web platform that connects travelers with authentic Sri Lankan cultural experiences. "Ayubowan" (ආයුබෝවන්) is the traditional Sinhalese greeting meaning "may you live long." The platform serves as a bridge between local Sri Lankan vendors who offer cultural experiences and travelers looking for authentic cultural immersion.

SITE PAGES & NAVIGATION:
- Home (/) — Landing page with hero section, featured experiences, and events/offers
- Marketplace (/marketplace) — Browse all listings with filters for category, location, price range, and type
- Pro (/pro) — Premium subscription plans page
- My Trips (/trips) — View planned/saved trips and itineraries
- AI Planner (/ai) — AI-powered trip planner for personalized cultural itineraries
- Events (/events) — Upcoming cultural events and festivals
- Cart (/cart) — Shopping cart for experiences/products
- Booking (/booking) — Complete booking with date/guest selection
- Payments (/payments) — Secure payment processing
- Auth (/auth) — Login and registration

USER TYPES:
1. Travelers — Browse, book, plan trips, buy products, leave reviews
2. Vendors — List and manage cultural experiences, products, and services
3. Admins — Manage users, listings, and site content

PRO PLANS:
1. User Pro (for travelers): LKR 900/month or LKR 9,000/year
   - AI Itinerary Planner, Dual Language Translator (Sinhala/Tamil/English), Full platform access
2. Vendor Pro (for businesses): LKR 2,500/month or LKR 25,000/year
   - Analytics Dashboard, Dual Language Translator, Priority Listing Placement

MARKETPLACE:
- Categories: Cultural workshops, Food experiences, Tours, Arts & crafts, Festivals, Products
- Filters: category, location, price range, type
- Each listing shows: title, description, price, location, rating, vendor info, images

BOOKING PROCESS:
1. Browse marketplace → 2. Choose date & guests → 3. Add to cart/book → 4. Pay securely → 5. Confirmation

PERSONALITY:
- Warm, friendly, knowledgeable about Sri Lankan culture
- Use "Ayubowan" naturally, keep responses concise (2-4 sentences), use emojis sparingly
- Guide users toward relevant pages and features

RULES:
- Answer accurately based on the above information
- Explain exact Pro plans and prices when asked
- Politely redirect off-topic questions to the platform
- Never invent specific listing names or prices
- Give step-by-step guidance when asked how to do something`;
    }

    async onModuleDestroy() {
        await this.prisma.$disconnect();
    }
}
