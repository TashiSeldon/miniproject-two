'use client';

import Link from 'next/link';

export default function ArticlePage() {
  return (
    <div className="bg-white min-vh-100">
      {/* Header Banner */}
      <div style={{
        background: '#1e3a8a',
        padding: '0.75rem 0',
        borderBottom: '2px solid #0a2472'
      }}>
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="text-white mb-0" style={{ fontSize: '1.5rem', fontWeight: '500' }}>ACM TechNews</h1>
          <Link 
            href="/student" 
            className="btn btn-outline-light rounded-1 px-4"
            style={{ fontSize: '0.9rem', fontWeight: '500' }}
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Welcome Text */}
      
      <div className="container py-3" style={{ borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ 
          fontSize: '1rem', 
          color: '#0066cc', 
          margin: 0,
          fontWeight: '400'
        }}>
          Welcome to the March 7, 2025 edition of ACM TechNews, providing timely information for computer professionals three times a week.
        </h2>
      </div>

      <div className="container py-3">
        {/* Main Content */}
        <div className="col-12">
          {/* Article 1: Drones */}
          <article className="mb-5">
            <h3 className="mb-3" style={{ 
              color: '#333', 
              fontSize: '1.75rem', 
              fontFamily: 'Georgia, serif',
              borderBottom: '2px solid #eee',
              paddingBottom: '0.5rem'
            }}>
              Drones change the war in Ukraine
            </h3>
            <div className="row">
              <div className="col-md-8">
                <p className="lead mb-3" style={{ 
                  fontSize: '1.1rem',
                  color: '#444',
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6'
                }}>
                  The war in Ukraine was deadlier in its third year than the first two years combined due to the use of weaponized drones. According to Roman Kostenko, chair of the defense and intelligence committee in Ukraine's Parliament, around 70% of Russian and Ukrainian casualties can be attributed to drones.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                  Both Ukrainian and Russian officials estimate that 3 million to 4 million drones will be made in each country this year. Ukrainian Colonel Vadym Sukharevsky said the country has adopted a "robots first" military strategy.
                </p>
                <p className="text-muted mt-3" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Source: The New York Times; Marc Santora; Lara Jakes; Andrew E. Kramer (March 3, 2025)
                </p>
              </div>
              <div className="col-md-4">
                <img
                  src="https://imgur.com/6AUTVdn.jpg"
                  alt="Drones in Ukraine"
                  className="img-fluid rounded"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </article>

          {/* Article 2: Chinese Hackers */}
          <article className="mb-5">
            <h3 className="mb-3" style={{ 
              color: '#333', 
              fontSize: '1.75rem', 
              fontFamily: 'Georgia, serif',
              borderBottom: '2px solid #eee',
              paddingBottom: '0.5rem'
            }}>
              U.S. Charges Chinese Hackers in Broad Cybercrime Campaign
            </h3>
            <p className="lead mb-3" style={{ 
              fontSize: '1.1rem',
              color: '#444',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.6'
            }}>
              The U.S. Department of Justice has charged 12 Chinese nationals in connection with global cybercrime campaigns targeting U.S. institutions.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
              In one indictment, eight leaders and employees of alleged private hacking company I-Soon were charged for computer breaches targeting U.S.-based Chinese dissidents, religious organizations, media outlets, a research university, and the Defense Intelligence Agency. In a separate indictment, two Chinese hackers were charged for a purported for-profit hacking campaign targeting U.S. technology companies, think tanks, defense contractors, and healthcare systems.
            </p>
            <p className="text-muted mt-3" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
              Source: Associated Press; Eric Tucker; Dake Kang (March 6, 2025)
            </p>
          </article>

          {/* Article 3: Quantum Computing */}
          <article className="mb-5">
            <h3 className="mb-3" style={{ 
              color: '#333', 
              fontSize: '1.75rem', 
              fontFamily: 'Georgia, serif',
              borderBottom: '2px solid #eee',
              paddingBottom: '0.5rem'
            }}>
              Quantum Computing Advances Promise Revolutionary Changes
            </h3>
            <div className="row">
              <div className="col-md-8">
                <p className="lead mb-3" style={{ 
                  fontSize: '1.1rem',
                  color: '#444',
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6'
                }}>
                  Quantum computers leverage the properties of quantum mechanics to process information exponentially faster than classical computers for specific tasks.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                  This year, we're seeing quantum computing being applied in areas such as cryptography, where it can potentially crack currently considered secure codes, and in drug discovery, speeding up the process by accurately simulating molecular structures. The technology is still nascent but poised to revolutionize industries by solving complex problems intractable for traditional computers.
                </p>
                <p className="text-muted mt-3" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Source: Nikita Duggal – Last updated on Mar 21, 2025
                </p>
              </div>
              <div className="col-md-4">
                <img
                  src="https://imgur.com/OCPhpZn.jpg"
                  alt="Quantum Computing"
                  className="img-fluid rounded"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </article>

          {/* Article 4: Quantum Computing Breakthroughs */}
          <article className="mb-5">
            <h3 className="mb-3" style={{ 
              color: '#333', 
              fontSize: '1.75rem', 
              fontFamily: 'Georgia, serif',
              borderBottom: '2px solid #eee',
              paddingBottom: '0.5rem'
            }}>
              Microsoft Unveils Revolutionary Quantum Processor
            </h3>
            <div className="row">
              <div className="col-md-8">
                <p className="lead mb-3" style={{ 
                  fontSize: '1.1rem',
                  color: '#444',
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6'
                }}>
                  Microsoft has unveiled <strong>Majorana 1</strong>, the first Quantum Processing Unit (QPU) powered by a Topological Core, engineered to scale up to a million qubits on a single chip.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
                  Alongside, they introduced a hardware-protected topological qubit—small, fast, and digitally controlled—marking a major shift in qubit architecture. A newly published device roadmap outlines the journey toward fault-tolerant quantum computing through quantum error correction.
                </p>
                <p className="text-muted mt-3" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  Source: Chetan Nayak, Technical Fellow and Corporate Vice President of Quantum Hardware
                </p>
              </div>
              <div className="col-md-4">
                <img
                  src="https://imgur.com/muLiw0v.jpg"
                  alt="Quantum Computing Breakthrough"
                  className="img-fluid rounded"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </article>

          {/* Article 5: Micro LLMs */}
          <article className="mb-5">
            <h3 className="mb-3" style={{ 
              color: '#333', 
              fontSize: '1.75rem', 
              fontFamily: 'Georgia, serif',
              borderBottom: '2px solid #eee',
              paddingBottom: '0.5rem'
            }}>
              Micro LLMs: The Future of Efficient AI
            </h3>
            <p className="lead mb-3" style={{ 
              fontSize: '1.1rem',
              color: '#444',
              fontFamily: 'Georgia, serif',
              lineHeight: '1.6'
            }}>
              Micro LLMs represent a new direction in natural language processing that focuses on creating compact, efficient versions of large language models without significantly compromising their capabilities.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333' }}>
              These models are tailored for environments where computational resources, storage or energy consumption is constrained, such as mobile devices, edge computing or real-time applications. The creation of micro LLMs for specific tasks can significantly simplify access to the capabilities of highly developed generative AI, including for medium and small businesses.
            </p>
            <p className="text-muted mt-3" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
              Source: Ivan Shkvarun, Forbes Councils Member of Forbes Technology Council
            </p>
          </article>
        </div>
        
      </div>
    </div>
  );
 
}
