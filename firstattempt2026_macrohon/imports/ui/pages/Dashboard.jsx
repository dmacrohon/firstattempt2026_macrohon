import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const Dashboard = () => {
  const { user, isLoading } = useTracker(() => {
    const sub = Meteor.subscribe('userData');
    return {
      user: Meteor.user(),
      isLoading: !sub.ready(),
    };
  });

  if (isLoading) return <div className="loading-screen">Loading Blue Knight Portal...</div>;

  const firstName = user?.profile?.name?.split(' ')[0] || 'Alumni';

  return (
    <div className="dash-viewport">
      <style>{`
        .dash-viewport {
          position: absolute; 
          top: 0; 
          left: 260px; /* <--- Matches the sidebar width */
          width: calc(100% - 260px); /* <--- Subtracts sidebar width from total */
          min-height: 100vh;
          background-color: #F3F4F6; 
          font-family: 'Inter', sans-serif; 
          padding-bottom: 50px;
        }

        /* --- Full Width Header --- */
        .dash-header {
          background-color: #00205B;
          background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          color: white;
          padding: 80px 8% 120px 8%; 
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dash-greeting-box h1 {
          font-family: "Times New Roman", serif;
          font-size: 2.8rem;
          margin: 0;
          font-weight: 400;
        }

        .dash-univ-tag {
          font-family: "Times New Roman", serif;
          text-transform: uppercase;
          letter-spacing: 3px;
          font-size: 0.85rem;
          opacity: 0.7;
          margin-bottom: 12px;
        }

        .dash-avatar-large {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 3px solid #E9C46A;
          background: #fff url('https://i.pravatar.cc/150?u=addu') center/cover;
          box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }

        /* --- Content Layout --- */
        .dash-content-wrapper {
          max-width: 1440px;
          margin: -70px auto 0 auto;
          padding: 0 4%;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
        }

        @media (max-width: 1024px) {
          .dash-content-wrapper { grid-template-columns: 1fr; }
        }

        /* --- Dashboard Portal Card --- */
        .main-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          margin-bottom: 40px;
        }

        .portal-title {
          color: #00205B;
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }

        .icon-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          padding: 24px 10px;
          border-radius: 20px;
          background: #F8FAFC;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid #EDF2F7;
        }

        .icon-btn:hover {
          background: #FFFFFF;
          border-color: #E9C46A;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,32,91,0.05);
        }

        .icon-glyph { font-size: 2.2rem; }
        .icon-text { 
          color: #00205B; 
          font-weight: 700; 
          font-size: 0.95rem;
          text-align: center;
        }

        /* --- News Section --- */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .news-item {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.04);
          transition: transform 0.2s;
        }
        
        .news-item:hover { transform: translateY(-3px); }

        .news-image {
          height: 200px;
          width: 100%;
          background: #CBD5E1 center/cover;
        }

        .news-body { padding: 24px; }
        .news-label { color: #00205B; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 12px; border-left: 3px solid #E9C46A; padding-left: 10px; }
        .news-heading { color: #1E293B; font-size: 1.2rem; font-weight: 700; line-height: 1.4; }

        /* --- Sidebar Events --- */
        .sidebar-card {
          background: white;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          position: sticky;
          top: 30px;
        }

        .event-row {
          display: flex;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #F1F5F9;
        }

        .date-badge {
          background: #F1F5F9;
          color: #00205B;
          min-width: 55px;
          height: 55px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #E2E8F0;
        }

        .date-day { font-weight: 800; font-size: 1.2rem; }
        .date-mon { font-size: 0.65rem; text-transform: uppercase; font-weight: 700; }

        .event-info { display: flex; flex-direction: column; justify-content: center; }
        .event-title { font-size: 1rem; font-weight: 600; color: #1E293B; margin-bottom: 4px; }
      `}</style>

      <header className="dash-header">
        <div className="dash-greeting-box">
          <div className="dash-univ-tag">Ateneo de Davao University</div>
          <h1>Welcome back, {firstName}!</h1>
        </div>
        <div className="dash-avatar-large"></div>
      </header>

      <main className="dash-content-wrapper">
        <div className="main-col">
          <section className="main-card">
            <h2 className="portal-title">Dashboard</h2>
            <div className="icon-grid">
              <a href="#" className="icon-btn">
                <span className="icon-glyph">📄</span>
                <span className="icon-text">Alumni Records</span>
              </a>
              <a href="/JobBoard" className="icon-btn">
                <span className="icon-glyph">💼</span>
                <span className="icon-text">Job Board</span>
              </a>
              <a href="#" className="icon-btn">
                <span className="icon-glyph">💙</span>
                <span className="icon-text">Donations</span>
              </a>
              <a href="#" className="icon-btn">
                <span className="icon-glyph">🌐</span>
                <span className="icon-text">Alumni Network</span>
              </a>
            </div>
          </section>

          <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
             <h2 style={{color: '#00205B', margin: 0}}>Latest News</h2>
             <span style={{color: '#00205B', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'}}>View All News →</span>
          </div>

          <div className="news-grid">
            <div className="news-item">
              <div className="news-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=600)'}}></div>
              <div className="news-body">
                <div className="news-label">Announcements</div>
                <div className="news-heading">Homecoming 2024: Blue Knights Reunite for 75th Anniversary</div>
              </div>
            </div>
            <div className="news-item">
              <div className="news-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600)'}}></div>
              <div className="news-body">
                <div className="news-label">Campus Life</div>
                <div className="news-heading">New Alumni Hub Lounge Opens at the Martin Hall</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="sidebar-col">
          <div className="sidebar-card">
            <h3 style={{color: '#00205B', marginBottom: '20px', fontSize: '1.2rem'}}>Upcoming Events</h3>
            
            <div className="event-row">
              <div className="date-badge">
                <span className="date-day">12</span>
                <span className="date-mon">DEC</span>
              </div>
              <div className="event-info">
                <div className="event-title">Tech Alumni Mixer</div>
                <small style={{color: '#64748B'}}>Community Center • 6:00 PM</small>
              </div>
            </div>

            <div className="event-row">
              <div className="date-badge">
                <span className="date-day">18</span>
                <span className="date-mon">DEC</span>
              </div>
              <div className="event-info">
                <div className="event-title">Year-end General Assembly</div>
                <small style={{color: '#64748B'}}>Finster Auditorium • 2:00 PM</small>
              </div>
            </div>
            
            <button style={{
              width: '100%', 
              marginTop: '24px', 
              padding: '14px', 
              borderRadius: '12px', 
              border: '2px solid #00205B',
              background: '#00205B',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}>Full Event Calendar</button>
          </div>
        </aside>
      </main>
    </div>
  );
};