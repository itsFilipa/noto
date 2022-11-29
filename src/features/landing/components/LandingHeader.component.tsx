import { useIonRouter } from "@ionic/react";
import { Button } from "../../../components";
import logo from "../assets/logo.svg";

export const LandingHeader = () => {

  const router = useIonRouter();

  const redirect = () => {
    router.push("/");
  }
  
  return (
    <div className="flex justify-between items-center">
      <img src={logo} alt="logo for noto" onClick={redirect} />
      <div className="flex justify-between items-center gap-8">
        <a href="#" className="text-neutral-500 font-medium">
          What's new
        </a>
        <a href="#" className="text-neutral-500 font-medium">
          Features
        </a>
        <a href="/download" className="text-neutral-500 font-medium">
          Download
        </a>
        <a href="#" className="text-neutral-500 font-medium">
          Docs
        </a>
      </div>
      <Button className="font-display">Download here</Button>
    </div>
  );
};
