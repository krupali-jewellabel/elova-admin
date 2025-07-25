import FormWizard from "@/components/commonPages/FormWizard";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      {" "}
      <Toaster position="top-right" />
      <FormWizard />;
    </>
  );
}
