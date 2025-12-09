import { useState } from "react";
import WelcomeModal from "./WelcomeModal";

function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="w-screen h-screen bg-slate-50">
      <WelcomeModal 
        open={showWelcome} 
        onOpenChange={setShowWelcome} 
        onTutorialClick={() => setShowWelcome(false)}
      />
    </div>
  )
}

export default Home
