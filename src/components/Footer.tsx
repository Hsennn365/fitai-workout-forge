
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BioFitAI. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-accent" /> for your fitness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
