import { APP_NAME } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
