import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Load Inter font which is similar to Apple's SF Pro
function loadFonts() {
  // Add preconnect links
  const preconnectGoogle = document.createElement("link");
  preconnectGoogle.rel = "preconnect";
  preconnectGoogle.href = "https://fonts.googleapis.com";
  document.head.appendChild(preconnectGoogle);
  
  const preconnectGstatic = document.createElement("link");
  preconnectGstatic.rel = "preconnect";
  preconnectGstatic.href = "https://fonts.gstatic.com";
  preconnectGstatic.crossOrigin = "anonymous";
  document.head.appendChild(preconnectGstatic);
  
  // Add font stylesheet - Inter is similar to SF Pro
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(fontLink);
  
  // Add custom CSS to use Inter as system font
  const style = document.createElement("style");
  style.textContent = `
    .font-display, .font-body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
  `;
  document.head.appendChild(style);
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    loadFonts();
    
    // Set page title
    document.title = "Сергей Технерядов | Фотограф";
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
