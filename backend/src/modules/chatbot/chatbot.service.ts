import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

interface ChatResponse {
    fulfillmentText: string;
    payload?: {
        navigation?: string;
        data?: any;
    };
}

@Injectable()
export class ChatbotService {
    private groqApiKey: string;

    constructor(private prisma: PrismaService) {
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
                    'Ayubowan! Welcome to Ayubowan Connect. I can help with bookings, marketplace exploration, vendor support, and events. How can I help?',
            };
        }

        // check for specific AI Itinerary Planner redirect
        if (/\b(plan|trip|itinerary|planner|journey|travel|schedule)\b/i.test(queryText) && /\b(take|go|bring|show)\b/i.test(queryText)) {
            return {
                fulfillmentText: 'For trip planning, please use our dedicated AI Itinerary Planner feature! 🗺️',
                payload: { navigation: '/ai' },
            };
        }

        // Send all other conversations to Groq AI
        if (this.groqApiKey) {
            try {
                const rawResponse = await this.askGroq(queryText);
                let aiResponse = rawResponse;
                let navPayload: { navigation?: string } | undefined = undefined;

                // look for the special navigation tag the AI might output
                const navMatch = rawResponse.match(/\[NAVIGATE:([^\]]+)\]/);
                if (navMatch) {
                    navPayload = { navigation: navMatch[1].trim() };
                    // remove the tag from the final text shown to the user
                    aiResponse = rawResponse.replace(/\[NAVIGATE:([^\]]+)\]/g, '').trim();
                }

                return { 
                    fulfillmentText: aiResponse, 
                    ...(navPayload ? { payload: navPayload } : {}) 
                };
            } catch (error) {
                console.error('Groq AI error:', error);
            }
        }

        // fallback if AI is unavailable
        return {
            fulfillmentText:
                "I'm having trouble connecting to my AI brain right now! But I'm here to help with Ayubowan Connect! You can ask me about exploring the marketplace & vendor support.",
        };
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
        return `You are the Ayubowan Connect Support Assistant — a customer service, booking, and vendor support chatbot for a Sri Lankan cultural marketplace. 

ABOUT YOUR ROLE:
Your primary duties are:
1. Marketplace & Booking Support (Helping with checkout, payments, bookings, and policies)
2. Customer Support & FAQ (Cancellations, refunds, and general platform help)
3. Event Discovery (Guiding users to local festivals and events)
4. Vendor & Pro-User Support (Helping vendors list items, navigate dashboards, and upgrade to PRO)
* IMPORTANT: You explicitly DO NOT handle Trip & Itinerary Planning. If asked, politely redirect users to the dedicated "AI Itinerary Planner" tool.

ABOUT AYUBOWAN CONNECT:
Ayubowan Connect connects travelers with authentic Sri Lankan cultural experiences. "Ayubowan" (ආයුබෝවන්) is the traditional greeting.

SITE PAGES & NAVIGATION:
- Marketplace (/marketplace) — Browse listings
- Pro (/pro) — Premium subscription plans page
- Events (/events) — Upcoming cultural events and festivals
- AI Planner (/ai) — The separate tool for trip planning
- Vendor Dashboard (/vendor) — Where vendors manage listings
- FAQ (/faq) — Policies and help

PLATFORM RULES & POLICIES (FAQ):
- Cancellations: Full refund if canceled 48 hours before the experience. No refund if canceled within 24 hours.
- Human Support: If a user is angry or the issue is complex, tell them to visit the FAQ page or an admin will contact them.
- Payments: All payments are processed securely. If a payment fails, advise them to check their card or try again later.
- Profile Management: Tell users they can change their name, profile picture, or settings from their Account Settings or User Profile Manager dashboard.

ROUTING & NAVIGATION (IMPORTANT):
Under NO circumstances should you output a [NAVIGATE:/path] tag unless the user explicitly types words demanding to be relocated, such as "take me to", "bring me to", "go to", "open", "redirect me to", or "show me the page".
If the user asks "How do I...", "Where can I...", or "What is...", NEVER output the [NAVIGATE:/path] tag! Instead, just explain what to do in text (e.g. "To pay, go to the cart page and click checkout.").
ONLY if the user strictly commands you to take them somewhere, append the exact tag at the absolute end of the message: [NAVIGATE:/path]
Use these EXACT paths:
- User Profile / Name Edit / Account Settings: [NAVIGATE:/User_profile_manager]
- Marketplace / Search: [NAVIGATE:/marketplace]
- Homepage / Home / Main Page: [NAVIGATE:/]
- Events: [NAVIGATE:/events]
- Cart / Checkout: [NAVIGATE:/cart]
- FAQ / Help: [NAVIGATE:/faq]
- Vendor Dashboard: [NAVIGATE:/vendor]
- Pro Upgrade: [NAVIGATE:/pro]

Example behavior:
User: "Can you bring me to the name edit page?"
AI: "Sure! I am taking you to your User Profile Manager where you can update your name and settings now. [NAVIGATE:/User_profile_manager]"

PRO PLANS:
1. Vendor Pro: LKR 2,500/month or LKR 25,000/year. Benefits: Analytics Dashboard, Priority Listing Placement.
2. User Pro: LKR 900/month (AI planner).

PERSONALITY:
- Warm, polite, and strictly professional about support. Use "Ayubowan" naturally. 
- Keep responses concise (2-4 sentences). 
- If someone asks to "plan a trip", tell them to use the AI Itinerary Planner.`;
    }

    async onModuleDestroy() {
        await this.prisma.$disconnect();
    }
}
