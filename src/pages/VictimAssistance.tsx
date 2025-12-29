import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Send, User } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "assistant";
  content: string;
}

interface FAQItem {
  keywords: string[];
  response: string;
}

const faqDatabase: FAQItem[] = [
  {
    keywords: ["scam", "scammed", "fraud", "money"],
    response: "I'm sorry to hear you may have been affected by a scam. Here's what you should do immediately:\n\n1. **Stop all contact** with the suspected scammer\n2. **Preserve evidence** - take screenshots of all communications\n3. **Contact your bank** if any financial information was shared\n4. **Report the incident** using our Contact/Report page\n5. **Change passwords** for any accounts that may be compromised\n\nRemember, it's not your fault. Scammers use sophisticated techniques to deceive people. Would you like more specific guidance?",
  },
  {
    keywords: ["report", "file", "complaint"],
    response: "To report a cybercrime incident:\n\n1. Visit our **Contact/Report** page\n2. Fill out the incident report form with as much detail as possible\n3. Include any evidence you have (screenshots, emails, transaction records)\n\nYour report helps us track and prevent future scams. All information is kept confidential and handled according to data protection regulations.",
  },
  {
    keywords: ["recover", "money back", "refund", "get back"],
    response: "Recovering money from a scam can be challenging, but here are steps that may help:\n\n1. **Contact your bank immediately** - Some transactions can be reversed if reported quickly\n2. **File a police report** - This is often required for insurance claims\n3. **Report to relevant authorities** - This helps build cases against scammers\n4. **Check for fraud protection** - Your credit card may have fraud protection policies\n\nBe cautious of 'recovery services' that promise to get your money back for a fee - these are often secondary scams.",
  },
  {
    keywords: ["phishing", "email", "fake"],
    response: "Phishing emails are designed to trick you into revealing personal information. Here's how to protect yourself:\n\n**Signs of phishing:**\n• Urgent language demanding immediate action\n• Requests for passwords or financial information\n• Suspicious sender addresses\n• Generic greetings like 'Dear Customer'\n• Poor grammar or spelling\n\n**What to do:**\n• Don't click any links\n• Don't download attachments\n• Report the email to your IT team\n• Mark as spam/phishing in your email client",
  },
  {
    keywords: ["identity", "stolen", "theft"],
    response: "If you suspect identity theft:\n\n1. **Place a fraud alert** on your credit reports\n2. **Review your credit reports** for unfamiliar accounts\n3. **Close compromised accounts** immediately\n4. **File an identity theft report** with authorities\n5. **Change all passwords** especially for financial accounts\n\nConsider placing a credit freeze to prevent new accounts from being opened in your name.",
  },
  {
    keywords: ["help", "support", "assistance", "hello", "hi"],
    response: "Hello! I'm the CyberShield Assistant. I'm here to help you with:\n\n• **Reporting scams** and cyber incidents\n• **Recovery guidance** if you've been victimized\n• **Security advice** to protect yourself online\n• **Information** about common cyber threats\n\nHow can I assist you today? Feel free to describe your situation, and I'll provide relevant guidance.",
  },
];

const defaultResponse = "I understand you need help. While I may not have specific information about your query, here are some general steps:\n\n1. Visit our **Scam Detection** page to analyze suspicious content\n2. Check the **Awareness** section for educational resources\n3. Use **Contact/Report** to submit an incident report\n\nCould you provide more details about your situation so I can better assist you?";

function findResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const faq of faqDatabase) {
    if (faq.keywords.some(keyword => lowerInput.includes(keyword))) {
      return faq.response;
    }
  }
  
  return defaultResponse;
}

export default function VictimAssistance() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello! I'm the CyberShield Assistant. I'm here to help you if you've been affected by cybercrime or need guidance on staying safe online.\n\nHow can I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    const assistantMessage: Message = {
      id: messages.length + 2,
      type: "assistant",
      content: findResponse(inputValue),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Victim Assistance
            </h1>
            <p className="text-muted-foreground">
              Get help and guidance if you've been affected by cybercrime. Our
              assistant is here to support you.
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="border-b border-border p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  CyberShield Assistant
                </p>
                <p className="text-xs text-muted-foreground">
                  Here to help you stay safe
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {message.type === "user" ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Shield className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This is an automated assistant. For emergencies, contact your
                local authorities.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
