import Hero from '../components/Hero';
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="pb-16">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Multi-Review Intelligence Capabilities</h2>
          <p className="text-slate-500 text-sm">Automating hospitality feedback analytics to eliminate manual classification loops.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="AI Sentiment Detection" 
            description="Automatically parse unstructured text nodes and classify sentiment vectors cleanly into Positive, Neutral, or Negative labels." 
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
            actionLabel="Analyze Text"
          />
          <Card 
            title="Smart Theme Extraction" 
            description="Isolate primary hospitality concern areas immediately, targeting Food Quality, Host Interactions, Location, Cleanliness, or Experience." 
            image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80"
            actionLabel="View Matrix Maps"
          />
          <Card 
            title="Contextual Response Generator" 
            description="Generate customized, one-line professional management response structures instantly based on the review intent profiles." 
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80"
            actionLabel="Test Generation"
          />
        </div>
      </div>
    </div>
  );
}