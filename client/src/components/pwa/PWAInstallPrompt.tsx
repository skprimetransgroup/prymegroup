import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Check if device is Android
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (!isAndroid) {
      return; // Don't show on iOS or other devices
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the custom install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Hide the prompt if app is already installed
    window.addEventListener("appinstalled", () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Set a flag to not show again for this session
    sessionStorage.setItem("pwa-install-dismissed", "true");
  };

  // Don't show if dismissed in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      setShowInstallPrompt(false);
    }
  }, []);

  if (!showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-lg shadow-lg border border-primary/20 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Install Prime Trans Group
              </h3>
              <p className="text-white/80 text-xs">
                Get quick access to our services
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white transition-colors"
            data-testid="install-prompt-dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleInstallClick}
            size="sm"
            className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold"
            data-testid="install-prompt-install"
          >
            Install App
          </Button>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            data-testid="install-prompt-later"
          >
            Later
          </Button>
        </div>
      </div>
    </div>
  );
}
