const { useState, useEffect, useRef } = React;

// --- Cute Icons ---
const Icons = {
    Pin: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
    ),
    Star: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
        </svg>
    ),
    Heart: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
    ),
    Menu: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    ),
        ArrowRight: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
    ),
    Close: ({ className }) => (
        <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
    )
};

// --- Custom Cursor (The Pin) ---
const CustomCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const updateCursor = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            const isHoverable = e.target.closest('a, button, input, textarea, [data-hoverable="true"]');
            setHovered(!!isHoverable);
        };
        window.addEventListener('mousemove', updateCursor);
        return () => window.removeEventListener('mousemove', updateCursor);
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <div 
            className="fixed pointer-events-none z-[100]"
            style={{ left: pos.x, top: pos.y }}
        >
            <div className={`transition-transform duration-300 -translate-x-1/2 -translate-y-full ${hovered ? 'scale-125 -translate-y-[120%]' : 'scale-100'}`}>
                <Icons.Pin className={`w-8 h-8 drop-shadow-md ${hovered ? 'text-rose' : 'text-peach'}`} />
            </div>
        </div>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 p-6">
            <div className="container mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-soft px-6 py-3 flex justify-between items-center border-2 border-apricot">
                <a href="#" className="flex items-center gap-2 group" data-hoverable="true">
                    <span className="bg-peach text-white w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-lg">N</span>
                    <span className="font-display font-bold text-xl text-ink">Navagation</span>
                </a>

                <div className="hidden md:flex gap-8 font-bold text-ink/70">
                    <a href="#about" className="hover:text-peach transition-colors" data-hoverable="true">About</a>
                    <a href="#projects" className="hover:text-peach transition-colors" data-hoverable="true">Journeys</a>
                    <a href="#contact" className="hover:text-peach transition-colors" data-hoverable="true">Contact</a>
                </div>

                <div className="hidden md:block">
                    <button className="bg-mint text-ink font-bold px-5 py-2 rounded-full border-2 border-sage hover:bg-sage hover:text-white transition-colors shadow-stamped active:translate-x-[2px] active:translate-y-[2px] active:shadow-none" data-hoverable="true">
                        Let's Connect
                    </button>
                </div>

                    <button className="md:hidden text-ink" onClick={() => setIsOpen(!isOpen)} data-hoverable="true">
                    {isOpen ? <Icons.Close className="w-6 h-6"/> : <Icons.Menu className="w-6 h-6"/>}
                </button>
            </div>

                {isOpen && (
                <div className="md:hidden absolute top-24 left-6 right-6 bg-white border-2 border-apricot rounded-2xl p-6 flex flex-col gap-4 shadow-soft animate-float">
                        <a href="#about" className="font-bold text-ink" onClick={()=>setIsOpen(false)}>About</a>
                        <a href="#projects" className="font-bold text-ink" onClick={()=>setIsOpen(false)}>Journeys</a>
                        <a href="#contact" className="font-bold text-ink" onClick={()=>setIsOpen(false)}>Contact</a>
                </div>
            )}
        </nav>
    );
};

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apricot/30 blob-shape translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mint/20 blob-shape -translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
                <div className="inline-block bg-white px-4 py-2 rounded-full border-2 border-peach mb-6 shadow-sm rotate-[-2deg]">
                    <span className="font-display font-bold text-peach">✨ Let's find your way...</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6 leading-tight">
                    Ready, Set, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-peach to-rose">Nava-gate!</span>
                </h1>
                
                <p className="max-w-xl mx-auto text-lg text-ink/70 mb-10 font-medium">
                    I'm Nava. I help teams navigate the messy world of learning design. Let's make the route from A to B a little more scenic.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="#projects" className="bg-peach text-white text-lg font-bold px-8 py-3 rounded-2xl border-2 border-peach hover:bg-white hover:text-peach transition-all shadow-soft flex items-center gap-2" data-hoverable="true">
                        Explore My Work <Icons.ArrowRight className="w-5 h-5"/>
                    </a>
                </div>

                {/* Cute Illustrated Elements */}
                <div className="absolute top-1/2 left-10 hidden lg:block animate-float">
                        <div className="bg-white p-3 rounded-xl shadow-soft border border-gray-100 rotate-[-6deg]">
                        <Icons.Pin className="w-8 h-8 text-rose mx-auto mb-1"/>
                        <span className="font-display text-xs font-bold text-ink">You are here</span>
                        </div>
                </div>

                    <div className="absolute bottom-1/4 right-10 hidden lg:block animate-bounce-slow">
                        <div className="bg-white p-3 rounded-full shadow-soft border border-gray-100">
                        <Icons.Star className="w-8 h-8 text-yellow-400"/>
                        </div>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ icon, title, desc, color, link }) => (
    <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 hover:border-peach hover:shadow-soft transition-all duration-300 group flex flex-col h-full hover:-translate-y-1" data-hoverable="true">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="font-display font-bold text-xl text-ink mb-2">{title}</h3>
        <p className="text-ink/60 text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
        <a href={link} target="_blank" className="text-left font-bold text-peach text-sm uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4 inline-block">
            Explore Project
        </a>
    </div>
);

const Projects = () => {
    const items = [
        {
            icon: <Icons.Pin className="w-8 h-8 text-rose-500"/>,
            title: "Compliance Detective",
            desc: "Transformed mandatory data privacy training into a noir-style interactive mystery. Learners find security breaches to solve the case.",
            color: "bg-rose-100",
            link: "[https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing](https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing)"
        },
        {
            icon: <Icons.Star className="w-8 h-8 text-orange-500"/>,
            title: "CRM Flight Simulator",
            desc: "A safe sandbox environment for sales teams to practice in the new Salesforce instance before go-live. Reduced data errors by 60%.",
            color: "bg-orange-100",
            link: "[https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing](https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing)"
        },
        {
            icon: <Icons.Heart className="w-8 h-8 text-teal-500"/>,
            title: "Manager Bootcamp",
            desc: "A blended 6-week cohort program mixing live workshops with Slack-based daily challenges. Decreased leadership churn by 15%.",
            color: "bg-teal-100",
            link: "[https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing](https://docs.google.com/document/d/18p70IBmiBBiSs6e6nNZr41-zNhfnRHyGhD41vF2RZFk/edit?usp=sharing)"
        }
    ];

    return (
        <section id="projects" className="py-24 container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="bg-rose-100 text-rose-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Portfolio</span>
                <h2 className="text-4xl font-display font-bold text-ink mt-4">My Past Journeys</h2>
                <p className="text-ink/60 mt-2">Souvenirs from my time as a Learning Designer.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {items.map((item, i) => <ProjectCard key={i} {...item} />)}
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 container mx-auto px-6">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-soft border-2 border-gray-50 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <div className="relative group">
                        <div className="absolute inset-0 bg-peach rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform"></div>
                        <img 
                            src="[https://images.unsplash.com/photo-1596962850195-da486dc3a974?q=80&w=2195&auto=format&fit=crop](https://images.unsplash.com/photo-1596962850195-da486dc3a974?q=80&w=2195&auto=format&fit=crop)" 
                            alt="Peaceful nature path" 
                            className="relative rounded-[2rem] border-4 border-white object-cover h-80 w-full"
                        />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-display font-bold text-ink mb-6">About the Guide</h2>
                        <p className="text-ink/70 mb-4 leading-relaxed">
                        Hi there! I think learning should feel like exploring a new city—exciting, a little challenging, but never scary.
                        </p>
                        <p className="text-ink/70 mb-6 leading-relaxed">
                        I bridge the gap between academic theory (the map) and real corporate life (the terrain). I make sure you don't get lost in the weeds.
                        </p>
                        
                        <div className="flex gap-4">
                        <div className="bg-paper p-4 rounded-2xl border border-apricot text-center min-w-[100px]">
                            <div className="font-display font-bold text-2xl text-peach">8+</div>
                            <div className="text-xs font-bold text-ink/50 uppercase">Years</div>
                        </div>
                        <div className="bg-paper p-4 rounded-2xl border border-apricot text-center min-w-[100px]">
                            <div className="font-display font-bold text-2xl text-peach">50+</div>
                            <div className="text-xs font-bold text-ink/50 uppercase">Projects</div>
                        </div>
                        </div>
                    </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-white py-12 border-t-2 border-gray-100 relative overflow-hidden" id="contact">
        {/* Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-mint/20 rounded-full blur-xl"></div>

        <div className="container mx-auto px-6 text-center">
            <h2 className="font-display font-bold text-2xl text-ink mb-8">Ready to start mapping?</h2>
            
            <div className="flex justify-center gap-6 mb-8">
                {['LinkedIn', 'Email', 'Twitter'].map(link => (
                    <a key={link} href="#" className="font-bold text-ink/60 hover:text-peach transition-colors" data-hoverable="true">
                        {link}
                    </a>
                ))}
            </div>
            
            <p className="text-xs text-gray-400 font-bold">
                Made with <span className="text-rose-400">♥</span> by Navagation
            </p>
        </div>
    </footer>
);

const App = () => {
    return (
        <div className="min-h-screen bg-paper grid-bg selection:bg-mint selection:text-ink">
            <CustomCursor />
            <Navbar />
            <Hero />
            <Projects />
            <About />
            <Footer />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
