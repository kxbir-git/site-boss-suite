import { useState } from "react";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactFab = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Query Sent!", description: "We'll get back to you shortly." });
    setName("");
    setEmail("");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-card border border-border rounded-xl shadow-2xl w-80 sm:w-96 animate-fade-in-up overflow-hidden">
          <div className="bg-primary px-5 py-4 flex items-center justify-between">
            <h3 className="text-primary-foreground font-heading text-lg tracking-wide">
              Connect With Us
            </h3>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 83033 61848</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>khanshoaib38989@gmail.com</span>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-sm font-medium text-foreground mb-3">Send us a query</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-sm"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-sm"
                />
                <Textarea
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[70px] text-sm resize-none"
                />
                <Button type="submit" size="sm" className="w-full font-heading tracking-wide">
                  <Send className="h-4 w-4 mr-1" /> Send Query
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Contact us"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ContactFab;
