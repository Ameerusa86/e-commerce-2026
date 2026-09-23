import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-slate-900 text-slate-200">
      <div className="wrapper py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{APP_NAME}</h3>
            <p className="text-sm text-slate-400">
              Delivering premium products for your business needs. Quality you can trust.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Contact Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
