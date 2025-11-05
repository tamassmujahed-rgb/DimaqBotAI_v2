import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Lightbulb, FileText, Sparkles, Send, CheckCircle2, Zap } from "lucide-react";
import { SiTelegram, SiOpenai } from "react-icons/si";

export default function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Question Answering",
      description: "Ask anything and get intelligent, context-aware responses powered by advanced AI technology. Your personal knowledge assistant available 24/7.",
    },
    {
      icon: Lightbulb,
      title: "Video Idea Generation",
      description: "Generate creative and engaging video concepts tailored to your niche. Perfect for content creators looking for fresh inspiration.",
    },
    {
      icon: FileText,
      title: "Script Writing",
      description: "Create professional scripts for videos, podcasts, or presentations. AI-crafted content that resonates with your audience.",
    },
    {
      icon: Sparkles,
      title: "Text Summarization",
      description: "Condense long articles, documents, or conversations into clear, concise summaries. Save time while staying informed.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Open Telegram",
      description: "Launch Telegram and search for the Digital Brain bot",
    },
    {
      number: "2",
      title: "Send Command",
      description: "Use simple commands like /ask, /videoidea, or /summarize",
    },
    {
      number: "3",
      title: "Get AI Response",
      description: "Receive intelligent, personalized responses instantly",
    },
  ];

  const capabilities = [
    "Multiple AI-powered commands",
    "Context-aware conversations",
    "Lightning-fast responses",
    "Creative content generation",
    "Arabic & English support",
    "Free to get started",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium gap-2"
                data-testid="badge-powered-by"
              >
                <SiOpenai className="w-4 h-4" />
                Powered by OpenAI GPT-4
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              data-testid="text-hero-title"
            >
              Your Digital Brain
              <span className="block text-primary mt-2">
                AI Assistant
              </span>
            </h1>

            {/* Subheading */}
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              data-testid="text-hero-subtitle"
            >
              Answer questions, create video ideas, generate scripts, and summarize texts with cutting-edge AI technology—all inside Telegram.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="gap-2"
                data-testid="button-start-telegram"
              >
                <SiTelegram className="w-5 h-5" />
                Start Chat on Telegram
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                data-testid="button-view-features"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Features
              </Button>
            </div>

            {/* Trust Indicator */}
            <p className="text-sm text-muted-foreground pt-4" data-testid="text-trust-indicator">
              Free to start • Intelligent from day one • No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              data-testid="text-features-title"
            >
              Powerful AI Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform how you create content, find information, and communicate with advanced AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-8 hover-elevate transition-all duration-300"
                data-testid={`card-feature-${index}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold" data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              data-testid="text-how-it-works-title"
            >
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-lg text-muted-foreground">
              Start using your digital brain in less than a minute
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative text-center"
                data-testid={`step-${index}`}
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10" />
                )}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold" data-testid={`text-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Showcase */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Chat Interface Mockup */}
            <div className="order-2 lg:order-1">
              <Card className="p-6 space-y-4 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Digital Brain AI</h4>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                      <p className="text-sm">/videoidea Tech tutorials</p>
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                      <p className="text-sm leading-relaxed">
                        Here are 3 engaging video ideas for tech tutorials: 1) "AI Tools That Will Change Your Workflow" 2) "Building Your First Telegram Bot" 3) "Mastering Prompt Engineering"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feature List */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 
                  className="text-4xl md:text-5xl font-bold mb-4"
                  data-testid="text-capabilities-title"
                >
                  Everything You Need
                </h2>
                <p className="text-lg text-muted-foreground">
                  A comprehensive AI assistant that adapts to your needs
                </p>
              </div>

              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3"
                    data-testid={`capability-${index}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg">{capability}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <h2 
              className="text-4xl md:text-5xl font-bold"
              data-testid="text-cta-title"
            >
              Ready to Unlock Your Digital Brain?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users leveraging AI for smarter content creation and communication
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              data-testid="button-cta-telegram"
            >
              <SiTelegram className="w-6 h-6" />
              Start Free on Telegram
            </Button>
            <p className="text-sm text-muted-foreground">
              Free to start • Intelligent from day one
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg mb-2">Digital Brain AI</h3>
              <p className="text-sm text-muted-foreground">
                Your intelligent Telegram assistant
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-commands">Commands</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">Support</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy</a>
            </div>

            <div className="text-center md:text-right">
              <Badge variant="outline" className="gap-2">
                <SiOpenai className="w-4 h-4" />
                Built with OpenAI GPT-4
              </Badge>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Digital Brain AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
