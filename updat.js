/* =========================================================================
   FILE NÂNG CẤP TOÀN DIỆN 3 TRÒ CHƠI 3D: updat.js (BẢN FIX LỖI CHUYỂN CHẾ ĐỘ)
   Tác giả: Thầy Hồ Tấn Khải – Trường THPT Mang Thít
   ========================================================================= */

(function initUpdat3DEditionAndFastestGame() {
  // Biến lưu chế độ chơi chuẩn xác, đồng bộ tuyệt đối với index.html
  let selectedModeMaster = 'TUG';

  /* =====================================================================
     PHẦN 1: CSS GIAO DIỆN 3D & BẢNG VINH DANH "AI NHANH NHẤT"
     ===================================================================== */
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @keyframes bgAuroraFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes textShineSweep {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes logoFloat3D {
      0%, 100% { transform: translateY(0px) rotateY(0deg); }
      50% { transform: translateY(-3px) rotateY(18deg); }
    }
    @keyframes titlePulseGlow {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.55)); }
      50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.95)); }
    }

    #top-author-banner {
      height: 50px !important;
      background: linear-gradient(180deg, #1e1b4b 0%, #0f172a 65%, #060913 100%) !important;
      border-bottom: 4px solid #d97706 !important;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.65), inset 0 2px 3px rgba(255, 255, 255, 0.25) !important;
      padding: 0 16px !important;
    }

    .game-logo-svg {
      width: 34px !important;
      height: 34px !important;
      animation: logoFloat3D 3.2s ease-in-out infinite !important;
    }

    .brand-title {
      font-size: 17px !important;
      font-weight: 900 !important;
      letter-spacing: 0.6px !important;
      text-transform: uppercase !important;
      background: linear-gradient(90deg, #fef08a 0%, #ffffff 25%, #38bdf8 50%, #fbbf24 75%, #fef08a 100%) !important;
      background-size: 200% auto !important;
      color: #fef08a !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      animation: textShineSweep 4.5s linear infinite, titlePulseGlow 2.5s ease-in-out infinite !important;
      filter: drop-shadow(0px 1px 0px #b45309)
              drop-shadow(0px 2px 0px #92400e)
              drop-shadow(0px 3px 0px #78350f)
              drop-shadow(0px 5px 8px rgba(0,0,0,0.8)) !important;
    }

    .author-badge {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 100%) !important;
      color: #0f172a !important;
      border: 1.5px solid #ffffff !important;
      border-bottom: 4px solid #b45309 !important;
      padding: 4px 13px !important;
      border-radius: 20px !important;
      font-size: 12.5px !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.8) !important;
    }
    .school-badge {
      background: linear-gradient(180deg, #34d399 0%, #059669 100%) !important;
      color: #ffffff !important;
      border: 1.5px solid #a7f3d0 !important;
      border-bottom: 4px solid #065f46 !important;
      padding: 4px 13px !important;
      border-radius: 20px !important;
      font-size: 12.5px !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.5) !important;
    }
    .btn-fullscreen-top {
      background: linear-gradient(180deg, #475569 0%, #1e293b 100%) !important;
      border: 1.5px solid #94a3b8 !important;
      border-bottom: 4px solid #0f172a !important;
      padding: 4px 12px !important;
      border-radius: 16px !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.4) !important;
    }

    #teacher-view {
      top: 50px !important;
      background: linear-gradient(-45deg, #1e1b4b, #0f172a, #0369a1, #4c1d95, #065f46, #7c2d12) !important;
      background-size: 400% 400% !important;
      animation: bgAuroraFlow 14s ease infinite !important;
      padding: 14px !important;
    }

    .setup-box {
      max-width: 1200px !important;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.96) 100%) !important;
      border: 3px solid #ffffff !important;
      border-bottom: 8px solid #cbd5e1 !important;
      border-radius: 24px !important;
      box-shadow: 0 22px 55px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.35), inset 0 2px 5px #ffffff !important;
      padding: 16px 22px !important;
    }

    .setup-box h2 {
      font-size: 19.5px !important;
      font-weight: 900 !important;
      background: linear-gradient(90deg, #1e1b4b, #0284c7, #7c3aed) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
    }

    /* Lưới 3 Chế độ chơi 3D luôn hiển thị đầy đủ 3 cột */
    .gamemode-selector {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 12px !important;
      margin: 10px 0 !important;
    }
    @media (max-width: 860px) {
      .gamemode-selector {
        grid-template-columns: 1fr !important;
      }
    }

    .gm-card {
      border-radius: 16px !important;
      border: 2px solid #cbd5e1 !important;
      border-bottom: 6px solid #94a3b8 !important;
      background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%) !important;
      box-shadow: 0 6px 15px rgba(0,0,0,0.08), inset 0 2px 2px #ffffff !important;
      transition: all 0.18s ease !important;
      padding: 11px 14px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      cursor: pointer !important;
    }
    .gm-card:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 12px 24px rgba(0,0,0,0.14), inset 0 2px 2px #ffffff !important;
    }
    .gm-card.active-gm {
      background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%) !important;
      border: 2.5px solid #0284c7 !important;
      border-bottom: 7px solid #0369a1 !important;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.32), inset 0 2px 3px #ffffff !important;
    }
    .gm-card.bell-gm.active-gm {
      background: linear-gradient(180deg, #fef9c3 0%, #fde047 100%) !important;
      border: 2.5px solid #d97706 !important;
      border-bottom: 7px solid #b45309 !important;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.38), inset 0 2px 3px #ffffff !important;
    }
    .gm-card.fast-gm.active-gm {
      background: linear-gradient(180deg, #f3e8ff 0%, #d8b4fe 100%) !important;
      border: 2.5px solid #9333ea !important;
      border-bottom: 7px solid #6b21a8 !important;
      box-shadow: 0 10px 25px rgba(147, 51, 234, 0.38), inset 0 2px 3px #ffffff !important;
    }
    .gm-icon {
      font-size: 32px !important;
      flex-shrink: 0 !important;
      filter: drop-shadow(0 3px 3px rgba(0,0,0,0.2)) !important;
    }
    .gm-info h3 {
      margin: 0 0 3px 0 !important;
      font-size: 14px !important;
      font-weight: 900 !important;
      color: #0f172a !important;
    }
    .gm-info p {
      margin: 0 !important;
      font-size: 11.5px !important;
      font-weight: 700 !important;
      color: #334155 !important;
      line-height: 1.32 !important;
    }

    .subject-manager {
      background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%) !important;
      border: 2px solid #ffffff !important;
      border-bottom: 5px solid #cbd5e1 !important;
      border-radius: 18px !important;
      padding: 12px !important;
    }

    .btn-subj {
      border-radius: 12px !important;
      border: 1.5px solid rgba(255,255,255,0.5) !important;
      border-bottom: 5px solid rgba(0, 0, 0, 0.38) !important;
      padding: 7px 12px !important;
      font-size: 12.5px !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.18), inset 0 2px 2px rgba(255,255,255,0.45) !important;
    }
    .btn-subj.active-subj {
      border: 2px solid #ffffff !important;
      border-bottom: 5px solid #0f172a !important;
      transform: translateY(-2px) scale(1.04) !important;
      box-shadow: 0 0 0 3px #f59e0b, 0 8px 16px rgba(0,0,0,0.3) !important;
    }

    .btn-action-sm {
      border-radius: 11px !important;
      border: 1.5px solid #cbd5e1 !important;
      border-bottom: 4.5px solid #94a3b8 !important;
      padding: 7px 12px !important;
      font-weight: 900 !important;
    }

    .btn-launch {
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #1d4ed8 100%) !important;
      border: 2px solid #bae6fd !important;
      border-bottom: 6px solid #1e3a8a !important;
      border-radius: 16px !important;
      padding: 12px 26px !important;
      font-size: 15.5px !important;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
      box-shadow: 0 10px 24px rgba(2, 132, 199, 0.45), inset 0 2px 3px rgba(255,255,255,0.65) !important;
    }

    #host-view { top: 50px !important; }
    #host-top-header {
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 60%, #060913 100%) !important;
      border-bottom: 3.5px solid #38bdf8 !important;
      padding: 6px 14px !important;
    }

    .c-btn {
      border-radius: 14px !important;
      border: 1.5px solid rgba(255,255,255,0.4) !important;
      border-bottom: 4.5px solid rgba(0,0,0,0.5) !important;
      padding: 5px 12px !important;
      font-size: 11.5px !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
    }

    .team-box.red {
      background: linear-gradient(180deg, #f87171 0%, #ef4444 45%, #b91c1c 100%) !important;
      border: 2px solid #fecaca !important;
      border-bottom: 5px solid #7f1d1d !important;
    }
    .team-box.blue {
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 100%) !important;
      border: 2px solid #bae6fd !important;
      border-bottom: 5px solid #0c4a6e !important;
    }
    .team-box.gold-bell {
      background: linear-gradient(180deg, #fbbf24 0%, #d97706 50%, #92400e 100%) !important;
      border: 2px solid #fef08a !important;
      border-bottom: 5px solid #78350f !important;
    }
    .team-box.purple-fast {
      background: linear-gradient(180deg, #c084fc 0%, #9333ea 50%, #581c87 100%) !important;
      border: 2px solid #f3e8ff !important;
      border-bottom: 5px solid #3b0764 !important;
      box-shadow: 0 6px 16px rgba(147, 51, 234, 0.45), inset 0 2px 3px rgba(255,255,255,0.5) !important;
    }
    .center-round-hud {
      background: linear-gradient(180deg, #1e1b4b 0%, #090d16 100%) !important;
      border: 2px solid #fde047 !important;
      border-bottom: 5px solid #b45309 !important;
    }

    #host-question-board {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      padding: 8px 18px 6px 18px !important;
      background: linear-gradient(180deg, #0f172a 0%, #060913 100%) !important;
      border-top: 4px solid #38bdf8 !important;
      position: relative !important;
    }
    #host-question-board .hq-title {
      order: 1 !important;
      margin-bottom: 6px !important;
      background: linear-gradient(180deg, #312e81 0%, #1e1b4b 100%) !important;
      border: 2.5px solid #a5b4fc !important;
      border-bottom: 6px solid #0f0728 !important;
      border-radius: 16px !important;
    }
    #host-question-board .hq-opts {
      order: 2 !important;
    }
    .hq-opt-item, .btn-ans {
      border-radius: 15px !important;
      border-top: 2px solid rgba(255,255,255,0.65) !important;
      border-left: 2px solid rgba(255,255,255,0.4) !important;
      border-right: 2px solid rgba(255,255,255,0.4) !important;
      border-bottom: 6px solid rgba(0,0,0,0.45) !important;
      box-shadow: 0 6px 15px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,255,255,0.35) !important;
    }
    #host-question-board .hq-header {
      order: 3 !important;
      margin-top: 6px !important;
      margin-bottom: 0 !important;
      padding: 6px 16px !important;
      background: linear-gradient(180deg, #1e293b 0%, #090d16 100%) !important;
      border: 1.5px solid #38bdf8 !important;
      border-bottom: 4px solid #0369a1 !important;
      border-radius: 14px !important;
    }

    /* Thanh Đếm Ngược 20 Giây & Bảng Vinh Danh Top 10 Realtime */
    #fast-timer-bar-wrap {
      order: 0 !important;
      width: 100%;
      height: 28px;
      background: #090d16;
      border: 2px solid #475569;
      border-radius: 14px;
      margin-bottom: 6px;
      position: relative;
      overflow: hidden;
      display: none;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.8);
      flex-shrink: 0;
    }
    #fast-timer-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #10b981, #34d399);
      transition: width 0.1s linear, background 0.3s ease;
    }
    #fast-timer-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13.5px;
      font-weight: 900;
      color: #ffffff;
      text-shadow: 0 1px 4px #000000;
      letter-spacing: 0.5px;
    }

    #fast-live-leaderboard {
      position: absolute;
      top: 8px;
      right: 12px;
      width: 315px;
      max-height: calc(100% - 16px);
      background: rgba(9, 13, 22, 0.93);
      backdrop-filter: blur(10px);
      border: 2.5px solid #f59e0b;
      border-bottom: 6px solid #92400e;
      border-radius: 18px;
      padding: 10px 12px;
      z-index: 30;
      display: none;
      flex-direction: column;
      box-shadow: 0 15px 35px rgba(0,0,0,0.8);
      overflow: hidden;
    }
    .flb-title {
      font-size: 13.5px;
      font-weight: 900;
      color: #fef08a;
      text-align: center;
      padding-bottom: 6px;
      border-bottom: 1.5px dashed #475569;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .flb-list {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-right: 2px;
    }
    .flb-row {
      display: grid;
      grid-template-columns: 28px 1fr auto;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 9px;
      background: rgba(30, 41, 59, 0.85);
      border: 1px solid #334155;
      font-size: 12px;
      font-weight: 800;
    }
    .flb-row.rank-1 {
      background: linear-gradient(90deg, rgba(234, 179, 8, 0.35), rgba(30, 41, 59, 0.9));
      border-color: #fde047;
      color: #fef08a;
    }
    .flb-row.rank-2 {
      background: linear-gradient(90deg, rgba(148, 163, 184, 0.32), rgba(30, 41, 59, 0.9));
      border-color: #e2e8f0;
    }
    .flb-row.rank-3 {
      background: linear-gradient(90deg, rgba(217, 119, 6, 0.32), rgba(30, 41, 59, 0.9));
      border-color: #fdba74;
    }
    .flb-rank { font-weight: 900; text-align: center; font-size: 12.5px; }
    .flb-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .flb-pts { font-weight: 900; color: #38bdf8; font-size: 12px; white-space: nowrap; }

    #mobile-fast-timer-wrap {
      width: 100%;
      height: 22px;
      background: #0f172a;
      border: 1.5px solid #475569;
      border-radius: 11px;
      margin: 4px 0;
      position: relative;
      overflow: hidden;
      display: none;
      flex-shrink: 0;
    }
    #mobile-fast-timer-fill {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #10b981, #34d399);
      transition: width 0.1s linear;
    }
    #mobile-fast-timer-txt {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      font-weight: 900;
      color: #fff;
      text-shadow: 0 1px 2px #000;
    }

    #fast-final-podium-box {
      display: none;
      margin-top: 10px;
      max-height: 270px;
      overflow-y: auto;
      background: #090d16;
      border: 2px solid #38bdf8;
      border-radius: 14px;
      padding: 8px 10px;
      text-align: left;
    }
    .ffp-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    .ffp-table th {
      background: #1e293b;
      color: #38bdf8;
      padding: 6px 8px;
      text-align: left;
      position: sticky;
      top: 0;
    }
    .ffp-table td {
      padding: 5px 8px;
      border-bottom: 1px solid #1e293b;
      font-weight: 800;
    }
    .grade-pill {
      display: inline-block;
      padding: 2px 9px;
      border-radius: 12px;
      font-weight: 900;
      font-size: 12px;
    }
    .grade-10 { background: #fef08a; color: #0f172a; border: 1.5px solid #f59e0b; }
    .grade-9  { background: #bbf7d0; color: #065f46; border: 1.5px solid #10b981; }
    .grade-8  { background: #bae6fd; color: #0c4a6e; border: 1.5px solid #0284c7; }
    .grade-7  { background: #e9d5ff; color: #581c87; border: 1.5px solid #9333ea; }
    .grade-other { background: #334155; color: #cbd5e1; }

    .rescue-btn-group {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .btn-rescue-batch {
      background: linear-gradient(180deg, #34d399 0%, #059669 100%) !important;
      color: #ffffff !important;
      border: 1.5px solid #a7f3d0 !important;
      border-bottom: 4.5px solid #064e3b !important;
      padding: 5px 12px !important;
      border-radius: 14px !important;
      font-size: 11.5px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }
    .btn-rescue-random5 {
      background: linear-gradient(180deg, #fbbf24 0%, #d97706 100%) !important;
      color: #ffffff !important;
      border: 1.5px solid #fef08a !important;
      border-bottom: 4.5px solid #78350f !important;
      padding: 5px 12px !important;
      border-radius: 14px !important;
      font-size: 11.5px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
    }

    #rescue-Floating-Banner {
      position: fixed;
      top: 105px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(180deg, #10b981 0%, #047857 100%);
      border: 3px solid #fef08a;
      border-bottom: 6px solid #064e3b;
      color: #fff;
      padding: 12px 28px;
      border-radius: 30px;
      font-size: 17px;
      font-weight: 900;
      z-index: 550;
      display: none;
      box-shadow: 0 15px 40px rgba(0,0,0,0.75);
      text-align: center;
    }

    #victory-modal {
      max-width: 720px !important;
      width: 95% !important;
      padding: 16px 22px !important;
    }
  `;
  document.head.appendChild(styleEl);

  const rescueBanner = document.createElement('div');
  rescueBanner.id = 'rescue-Floating-Banner';
  document.body.appendChild(rescueBanner);

  function showRescueBanner(msg) {
    rescueBanner.innerHTML = msg;
    rescueBanner.style.display = 'block';
    if (typeof confetti === 'function') {
      confetti({ particleCount: 140, spread: 85, origin: { y: 0.45 } });
    }
    if (typeof AudioFX !== 'undefined' && AudioFX.bonusLifeChime) {
      AudioFX.bonusLifeChime();
    }
    setTimeout(() => { rescueBanner.style.display = 'none'; }, 3800);
  }

  /* =====================================================================
     PHẦN 2: CÔNG THỨC TÍNH ĐIỂM "AI NHANH NHẤT" & QUY ĐỔI ĐIỂM HỆ 10
     ===================================================================== */
  const FASTEST_Q_DURATION_SEC = 20;
  const FASTEST_MAX_POINTS = 1000;

  window.fastestHostTimer = null;
  window.fastestQuestionStartMs = 0;
  window.fastestRemainingSec = FASTEST_Q_DURATION_SEC;
  window.fastestCorrectOrderCount = 0;
  window.fastestQuestionTransitioning = false;

  window.fastestMobileTimer = null;
  window.fastestMobileStartMs = 0;
  window.myFastestTotalScore = 0;
  window.myFastestLastGain = 0;
  window.myFastestRank = 0;

  function calculateFastestPoints(elapsedSeconds, orderIndex) {
    if (orderIndex === 0 && elapsedSeconds <= 1.2) {
      return FASTEST_MAX_POINTS;
    }
    const clampedSec = Math.max(0, Math.min(FASTEST_Q_DURATION_SEC, elapsedSeconds));
    const timeFactor = 1 - 0.85 * (clampedSec / FASTEST_Q_DURATION_SEC);
    const orderPenalty = Math.min(150, orderIndex * 15);
    const rawPts = Math.round(FASTEST_MAX_POINTS * timeFactor) - orderPenalty;
    return Math.max(100, Math.min(FASTEST_MAX_POINTS, rawPts));
  }

  function getConvertedGradeByRank(rankNumber, totalScore) {
    if (!totalScore || totalScore <= 0) {
      return { grade: 0, label: '0 điểm (Chưa có điểm)', css: 'grade-other' };
    }
    if (rankNumber >= 1 && rankNumber <= 3) {
      return { grade: 10, label: '10 điểm', css: 'grade-10' };
    }
    if (rankNumber >= 4 && rankNumber <= 6) {
      return { grade: 9, label: '9 điểm', css: 'grade-9' };
    }
    if (rankNumber >= 7 && rankNumber <= 10) {
      return { grade: 8, label: '8 điểm', css: 'grade-8' };
    }
    if (rankNumber >= 11 && rankNumber <= 15) {
      return { grade: 7, label: '7 điểm', css: 'grade-7' };
    }
    return { grade: 6, label: 'Khuyến khích', css: 'grade-other' };
  }

  function getSortedFastestLeaderboard() {
    if (typeof matchState === 'undefined') return [];
    const allPlayers = [...matchState.redPlayers, ...matchState.bluePlayers];
    return allPlayers.map(p => ({
      id: p.id,
      label: p.label,
      team: p.team,
      fastScore: p.fastScore || 0,
      lastDelta: p.lastDelta || 0,
      lastTimeSec: typeof p.lastTimeSec === 'number' ? p.lastTimeSec : null,
      correct: p.correct || 0,
      wrong: p.freeze || 0,
      totalTimeMs: p.totalTimeMs || 0
    })).sort((a, b) => {
      if (b.fastScore !== a.fastScore) return b.fastScore - a.fastScore;
      if (b.correct !== a.correct) return b.correct - a.correct;
      return a.totalTimeMs - b.totalTimeMs;
    });
  }

  /* =====================================================================
     PHẦN 3: CHÈN GIAO DIỆN CHỌN 3 TRÒ CHƠI & BẢNG TOP 10
     ===================================================================== */
  function injectFastestGameUI() {
    const brandTitle = document.querySelector('.brand-title');
    if (brandTitle) {
      brandTitle.innerText = 'ĐẤU TRƯỜNG 3D: KÉO CO • RUNG CHUÔNG VÀNG • AI NHANH NHẤT';
    }

    const tugCardIcon = document.querySelector('#gm-card-TUG .gm-icon');
    if (tugCardIcon) tugCardIcon.innerHTML = '⚔️';

    const gmSelector = document.querySelector('.gamemode-selector');
    if (gmSelector && !document.getElementById('gm-card-FAST')) {
      const fastCard = document.createElement('div');
      fastCard.className = 'gm-card fast-gm';
      fastCard.id = 'gm-card-FAST';
      fastCard.onclick = () => window.selectGamePlayType('FAST');
      fastCard.innerHTML = `
        <div class="gm-icon">⚡</div>
        <div class="gm-info">
          <h3>CHẾ ĐỘ 3: AI NHANH NHẤT 3D (ĐUA TỐC ĐỘ 20 GIÂY)</h3>
          <p>Mỗi câu <b>20 giây</b>: Đúng & nhanh nhất trọn <b>1.000đ</b>, giảm dần; Sai/Không trả lời: <b>0đ</b>. Vinh danh <b>Top 10 Realtime</b>. Thưởng điểm: <b>Hạng 1-3 (10đ), 4-6 (9đ), 7-10 (8đ), 11-15 (7đ)</b>!</p>
        </div>
      `;
      gmSelector.appendChild(fastCard);
    }

    const qBoard = document.getElementById('host-question-board');
    if (qBoard && !document.getElementById('fast-timer-bar-wrap')) {
      const timerWrap = document.createElement('div');
      timerWrap.id = 'fast-timer-bar-wrap';
      timerWrap.innerHTML = `
        <div id="fast-timer-fill"></div>
        <div id="fast-timer-text">⏱️ THỜI GIAN CÒN LẠI: 20.0 GIÂY (Đúng & nhanh nhất: +1000 điểm)</div>
      `;
      qBoard.insertBefore(timerWrap, qBoard.firstChild);
    }

    const arenaVp = document.getElementById('arena-3d-viewport');
    if (arenaVp && !document.getElementById('fast-live-leaderboard')) {
      const lb = document.createElement('div');
      lb.id = 'fast-live-leaderboard';
      lb.innerHTML = `
        <div class="flb-title">
          <span>⚡ VINH DANH TOP 10 REALTIME</span>
          <span id="flb-sub-count" style="font-size:11px; color:#38bdf8;">0 HS</span>
        </div>
        <div class="flb-list" id="flb-list-body">
          <div style="text-align:center; color:#94a3b8; font-size:12px; padding:12px 0;">
            Chờ thí sinh ghi điểm tốc độ...
          </div>
        </div>
      `;
      arenaVp.appendChild(lb);
    }

    const vicModal = document.getElementById('victory-modal');
    if (vicModal && !document.getElementById('fast-final-podium-box')) {
      const podiumBox = document.createElement('div');
      podiumBox.id = 'fast-final-podium-box';
      const btnRow = vicModal.querySelector('div');
      if (btnRow) {
        vicModal.insertBefore(podiumBox, btnRow);
      } else {
        vicModal.appendChild(podiumBox);
      }
    }

    const mobileQuizBox = document.getElementById('active-quiz-container');
    if (mobileQuizBox && !document.getElementById('mobile-fast-timer-wrap')) {
      const mTimer = document.createElement('div');
      mTimer.id = 'mobile-fast-timer-wrap';
      mTimer.innerHTML = `
        <div id="mobile-fast-timer-fill"></div>
        <div id="mobile-fast-timer-txt">⏱️ 20.0s</div>
      `;
      mobileQuizBox.insertBefore(mTimer, mobileQuizBox.firstChild);
    }
  }

  /* =====================================================================
     PHẦN 4: FIX TRIỆT ĐỂ LỖI CHUYỂN CHẾ ĐỘ CHƠI (TUG / BELL / FAST)
     ===================================================================== */
  const origSelectGamePlayType = window.selectGamePlayType;
  window.selectGamePlayType = function(type) {
    selectedModeMaster = type;
    window.currentGamePlayType = type;

    // Gọi hàm gốc của index.html để cập nhật biến let currentGamePlayType bên trong index.html
    if (typeof origSelectGamePlayType === 'function') {
      origSelectGamePlayType(type);
    }

    const cTug = document.getElementById('gm-card-TUG');
    const cBell = document.getElementById('gm-card-BELL');
    const cFast = document.getElementById('gm-card-FAST');
    if (cTug) cTug.classList.toggle('active-gm', type === 'TUG');
    if (cBell) cBell.classList.toggle('active-gm', type === 'BELL');
    if (cFast) cFast.classList.toggle('active-gm', type === 'FAST');

    const teamCfg = document.getElementById('tug-team-config-row');
    if (teamCfg) {
      teamCfg.style.opacity = (type === 'TUG') ? '1' : '0.55';
    }
  };

  // Ghi đè resetArenaObjects để đảm bảo matchState.gameType luôn nhận đúng chế độ đã chọn
  const origResetArenaObjects = window.resetArenaObjects;
  window.resetArenaObjects = function() {
    if (typeof origResetArenaObjects === 'function') {
      origResetArenaObjects();
    }
    if (typeof matchState !== 'undefined') {
      matchState.gameType = selectedModeMaster;
    }
    window.update3DSceneByGameType();
    if (typeof applyRoundAtmosphere === 'function') {
      applyRoundAtmosphere(selectedModeMaster === 'TUG' ? 1 : 3);
    }
    window.updateHostHUD();
  };

  // Cập nhật Bảng Vinh Danh Top 10 Realtime trên màn hình Giáo viên
  window.renderFastestLiveLeaderboard = function() {
    const lbBox = document.getElementById('fast-live-leaderboard');
    if (!lbBox || typeof matchState === 'undefined') return;

    if (matchState.gameType !== 'FAST') {
      lbBox.style.display = 'none';
      return;
    }

    lbBox.style.display = 'flex';
    const ranked = getSortedFastestLeaderboard();
    const top10 = ranked.slice(0, 10);

    const countEl = document.getElementById('flb-sub-count');
    if (countEl) countEl.innerText = `${ranked.length} thí sinh`;

    const listBody = document.getElementById('flb-list-body');
    if (!listBody) return;

    if (top10.length === 0) {
      listBody.innerHTML = `<div style="text-align:center; color:#94a3b8; font-size:12px; padding:12px 0;">Đang chờ thí sinh vào sân...</div>`;
      return;
    }

    listBody.innerHTML = top10.map((p, idx) => {
      const rank = idx + 1;
      const medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `#${rank}`));
      const gradeInfo = getConvertedGradeByRank(rank, p.fastScore);
      const deltaBadge = p.lastDelta > 0
        ? `<span style="color:#4ade80; font-size:10.5px;">(+${p.lastDelta}${p.lastTimeSec !== null ? ` • ${p.lastTimeSec.toFixed(1)}s` : ''})</span>`
        : '';
      return `
        <div class="flb-row rank-${rank}">
          <div class="flb-rank">${medal}</div>
          <div class="flb-name" title="${p.label}">${p.label} ${deltaBadge}</div>
          <div class="flb-pts">${p.fastScore}đ <span style="color:#fde047; font-size:10.5px;">[${gradeInfo.grade}đ]</span></div>
        </div>
      `;
    }).join('');
  };

  // Bộ đếm ngược 20 Giây cho từng câu hỏi ở chế độ "AI NHANH NHẤT"
  window.stopFastestQuestionTimer = function() {
    if (window.fastestHostTimer) {
      clearInterval(window.fastestHostTimer);
      window.fastestHostTimer = null;
    }
  };

  window.startFastestQuestionTimer = function() {
    window.stopFastestQuestionTimer();
    const barWrap = document.getElementById('fast-timer-bar-wrap');
    if (typeof matchState === 'undefined' || matchState.gameType !== 'FAST') {
      if (barWrap) barWrap.style.display = 'none';
      return;
    }

    if (barWrap) barWrap.style.display = 'block';
    window.fastestQuestionStartMs = Date.now();
    window.fastestRemainingSec = FASTEST_Q_DURATION_SEC;
    window.fastestCorrectOrderCount = 0;
    window.fastestQuestionTransitioning = false;

    [...matchState.redPlayers, ...matchState.bluePlayers].forEach(p => {
      p.lastDelta = 0;
      p.lastTimeSec = null;
    });
    window.renderFastestLiveLeaderboard();

    if (typeof sendCloudMessage === 'function') {
      sendCloudMessage({
        type: 'FAST_QUESTION_START',
        globalQIndex: matchState.globalQIndex,
        durationSec: FASTEST_Q_DURATION_SEC,
        serverStartTime: window.fastestQuestionStartMs
      });
    }

    const fillEl = document.getElementById('fast-timer-fill');
    const txtEl = document.getElementById('fast-timer-text');

    window.fastestHostTimer = setInterval(() => {
      if (matchState.status !== 'PLAYING') return;

      const elapsed = (Date.now() - window.fastestQuestionStartMs) / 1000;
      const rem = Math.max(0, FASTEST_Q_DURATION_SEC - elapsed);
      window.fastestRemainingSec = rem;
      const pct = (rem / FASTEST_Q_DURATION_SEC) * 100;

      if (fillEl) {
        fillEl.style.width = `${pct}%`;
        if (rem > 10) {
          fillEl.style.background = 'linear-gradient(90deg, #10b981, #34d399)';
        } else if (rem > 5) {
          fillEl.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        } else {
          fillEl.style.background = 'linear-gradient(90deg, #ef4444, #f87171)';
        }
      }

      const currentPotentialPts = calculateFastestPoints(elapsed, window.fastestCorrectOrderCount);
      if (txtEl) {
        txtEl.innerText = rem > 0
          ? `⏱️ THỜI GIAN CÒN LẠI: ${rem.toFixed(1)} GIÂY • Trả lời đúng ngay lúc này nhận: +${currentPotentialPts} điểm`
          : `⌛ HẾT 20 GIÂY! Không trả lời: 0 điểm • Đang chuyển câu tiếp theo...`;
      }

      if (rem <= 0 && !window.fastestQuestionTransitioning) {
        window.fastestQuestionTransitioning = true;
        window.stopFastestQuestionTimer();
        handleFastestQuestionTimeoutOrAllDone();
      }
    }, 100);
  };

  function handleFastestQuestionTimeoutOrAllDone() {
    if (typeof matchState === 'undefined' || matchState.gameType !== 'FAST' || matchState.status !== 'PLAYING') return;

    if (matchState.globalQIndex + 1 >= quizList.length) {
      setTimeout(() => {
        if (matchState.status === 'PLAYING') {
          window.endMatchManual();
        }
      }, 1200);
    } else {
      setTimeout(() => {
        if (matchState.status === 'PLAYING') {
          matchState.globalQIndex++;
          matchState.redAnsweredIds = [];
          matchState.blueAnsweredIds = [];
          if (typeof update3DLabelsStatusOnly === 'function') update3DLabelsStatusOnly();
          if (typeof updateHostHUD === 'function') updateHostHUD();
          if (typeof renderHostQuestionShowcase === 'function') renderHostQuestionShowcase();
          if (typeof broadcastTeamSyncState === 'function') broadcastTeamSyncState();
          window.startFastestQuestionTimer();
        }
      }, 1500);
    }
  }

  // Mở rộng Scene 3D & Nhãn 3D cho chế độ "AI NHANH NHẤT"
  const origUpdate3DScene = window.update3DSceneByGameType;
  window.update3DSceneByGameType = function() {
    if (!scene) return;
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      if (ropeMesh) ropeMesh.visible = false;
      if (ribbonMesh) ribbonMesh.visible = false;
      if (tugLinesGroup) tugLinesGroup.visible = false;
      if (goldenBellStageGroup) goldenBellStageGroup.visible = true;
      window.renderFastestLiveLeaderboard();
    } else {
      const lb = document.getElementById('fast-live-leaderboard');
      if (lb) lb.style.display = 'none';
      const barWrap = document.getElementById('fast-timer-bar-wrap');
      if (barWrap) barWrap.style.display = 'none';
      if (typeof origUpdate3DScene === 'function') origUpdate3DScene();
    }
  };

  const origFormatPlayerLabel = window.formatPlayerLabelText;
  window.formatPlayerLabelText = function(p, hasDoneQ) {
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const score = p.fastScore || 0;
      const doneIcon = hasDoneQ ? '⚡ ' : '⏳ ';
      return `${doneIcon}${p.label} (${score}đ)`;
    }
    return origFormatPlayerLabel(p, hasDoneQ);
  };

  const origRebuildAll3D = window.rebuildAll3DCharacters;
  window.rebuildAll3DCharacters = function() {
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const savedType = matchState.gameType;
      matchState.gameType = 'BELL';
      origRebuildAll3D();
      matchState.gameType = savedType;
      update3DLabelsStatusOnly();
      window.renderFastestLiveLeaderboard();
    } else {
      origRebuildAll3D();
    }
  };

  const origUpdateHostHUD = window.updateHostHUD;
  window.updateHostHUD = function() {
    // Ẩn/Hiện nút Cứu trợ tùy theo chế độ Rung Chuông Vàng
    const rescueBox = document.getElementById('updat-rescue-box');
    if (rescueBox && typeof matchState !== 'undefined') {
      rescueBox.style.display = (matchState.gameType === 'BELL') ? 'inline-flex' : 'none';
    }

    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const leftBox = document.getElementById('hud-left-box');
      const rightBox = document.getElementById('hud-right-box');
      const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
      const ranked = getSortedFastestLeaderboard();
      const top1 = ranked[0];

      if (leftBox) leftBox.className = 'team-box purple-fast';
      if (rightBox) rightBox.className = 'team-box purple-fast';

      document.getElementById('hud-red-count').innerText = `⚡ THÍ SINH THAM GIA: ${allP.length} HS`;
      document.getElementById('hud-red-rounds').innerText = `⏱️ 20 giây / câu`;
      document.getElementById('hud-blue-count').innerText = top1 && top1.fastScore > 0
        ? `👑 DẪN ĐẦU: ${top1.label} (${top1.fastScore}đ)`
        : `👑 DẪN ĐẦU: Chưa có điểm`;
      document.getElementById('hud-blue-rounds').innerText = `🎯 Hạng 1-3: 10đ | 4-6: 9đ | 7-10: 8đ`;

      document.getElementById('hud-round-title').innerText =
        `⚡ AI NHANH NHẤT 3D • ĐÚNG & NHANH NHẤT ĐƯỢC TRỌN 1.000 ĐIỂM, GIẢM DẦN THEO GIÂY!`;
      document.getElementById('hud-rope-score').innerText =
        `Mã Phòng: ${activeRoomId} | Câu ${matchState.globalQIndex + 1}/${quizList.length || 1} • Đã trả lời: ${matchState.redAnsweredIds.length + matchState.blueAnsweredIds.length}/${allP.length} HS`;
      window.renderFastestLiveLeaderboard();
    } else {
      origUpdateHostHUD();
    }
  };

  const origRenderQRCodes = window.renderQRCodes;
  window.renderQRCodes = function(roomId) {
    origRenderQRCodes(roomId);
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const base = getCleanWebBaseURL();
      qrRedUrl = `${base}?r=${roomId}&t=R&gm=F`;
      qrBlueUrl = `${base}?r=${roomId}&t=B&gm=F`;

      const redContainer = document.getElementById('qr-red');
      const blueContainer = document.getElementById('qr-blue');
      if (redContainer && blueContainer) {
        redContainer.innerHTML = '';
        blueContainer.innerHTML = '';
        try {
          new QRCode(redContainer, { text: qrRedUrl, width: 112, height: 112, colorDark: "#000000", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.L });
          new QRCode(blueContainer, { text: qrBlueUrl, width: 112, height: 112, colorDark: "#000000", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.L });
        } catch(e) {}
      }
      document.getElementById('qr-left-caption').innerText = '⚡ QUÉT VÀO AI NHANH NHẤT';
      document.getElementById('qr-right-caption').innerText = '⚡ QUÉT VÀO AI NHANH NHẤT';
    }
  };

  const origOpenQRZoomModal = window.openQRZoomModal;
  window.openQRZoomModal = function(team) {
    origOpenQRZoomModal(team);
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const title = document.getElementById('qr-zoom-title');
      if (title) {
        title.innerText = '⚡ QUÉT MÃ THAM GIA AI NHANH NHẤT';
        title.style.color = '#9333ea';
      }
    }
  };

  const origGetRoundThemeLabel = window.getRoundThemeLabel;
  window.getRoundThemeLabel = function(roundNum) {
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      return '⚡ ĐẤU TRƯỜNG AI NHANH NHẤT (20 GIÂY/CÂU)';
    }
    return origGetRoundThemeLabel(roundNum);
  };

  const origStartMatch = window.startMatch;
  window.startMatch = function() {
    origStartMatch();
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      window.renderFastestLiveLeaderboard();
      window.startFastestQuestionTimer();
    }
  };

  const origForceAdvance = window.forceAdvanceGlobalQuestion;
  window.forceAdvanceGlobalQuestion = function() {
    origForceAdvance();
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST' && matchState.status === 'PLAYING') {
      window.startFastestQuestionTimer();
    }
  };

  const origStepHostQ = window.stepHostQuestion;
  window.stepHostQuestion = function(delta) {
    origStepHostQ(delta);
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST' && !isReviewAnswersMode && matchState.status === 'PLAYING') {
      window.startFastestQuestionTimer();
    }
  };

  const origReturnToSetup = window.returnToSetup;
  window.returnToSetup = function() {
    window.stopFastestQuestionTimer();
    origReturnToSetup();
  };

  window.switchToStudentOnSameDevice = function() {
    const code = prompt("Nhập Mã Phòng gồm 5 chữ số trên màn hình máy chiếu (VD: 12345):", activeRoomId);
    if (!code) return;
    initMobilePlayer(code.trim(), 'RED', currentSubjectKey, selectedModeMaster);
  };

  const origBroadcastSync = window.broadcastTeamSyncState;
  window.broadcastTeamSyncState = function() {
    origBroadcastSync();
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const ranked = getSortedFastestLeaderboard();
      sendCloudMessage({
        type: 'FAST_LEADERBOARD_SYNC',
        globalQIndex: matchState.globalQIndex,
        remainingSec: window.fastestRemainingSec,
        status: matchState.status,
        top10: ranked.slice(0, 10),
        allRanks: ranked.map((r, i) => ({
          id: r.id,
          rank: i + 1,
          fastScore: r.fastScore,
          grade: getConvertedGradeByRank(i + 1, r.fastScore).grade
        }))
      });
    }
  };

  /* =====================================================================
     PHẦN 5: XỬ LÝ DỮ LIỆU TRẢ LỜI CỦA HỌC SINH & TÍNH ĐIỂM TỐC ĐỘ
     ===================================================================== */
  window.lastEliminatedBatchIds = [];
  window.eliminatedHistoryByQ = {};

  const origHandleHostIncoming = window.handleHostIncomingData;
  window.handleHostIncomingData = function(d) {
    if (!d || !d.type) return;

    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      if (d.type === 'PULL_CORRECT') {
        const pObj = registerOrGetPlayer(d.playerId, d.team, d.playerName, true);
        if (matchState.status !== 'PLAYING') return;
        if (d.qIndex !== matchState.globalQIndex) return;

        const alreadyAnswered = matchState.redAnsweredIds.includes(pObj.id) || matchState.blueAnsweredIds.includes(pObj.id);
        if (alreadyAnswered) return;

        if (pObj.team === 'RED') matchState.redAnsweredIds.push(pObj.id);
        else matchState.blueAnsweredIds.push(pObj.id);

        const hostElapsedSec = Math.max(0.1, (Date.now() - (window.fastestQuestionStartMs || Date.now())) / 1000);
        const studentElapsedSec = (typeof d.elapsedSec === 'number' && d.elapsedSec >= 0.05 && d.elapsedSec <= 20)
          ? d.elapsedSec
          : hostElapsedSec;

        const gainedPts = calculateFastestPoints(studentElapsedSec, window.fastestCorrectOrderCount);
        window.fastestCorrectOrderCount++;

        pObj.correct = (pObj.correct || 0) + 1;
        pObj.fastScore = (pObj.fastScore || 0) + gainedPts;
        pObj.lastDelta = gainedPts;
        pObj.lastTimeSec = studentElapsedSec;
        pObj.totalTimeMs = (pObj.totalTimeMs || 0) + Math.round(studentElapsedSec * 1000);

        const qItem = quizList[matchState.globalQIndex % quizList.length];
        if (qItem) qItem.rightCount = (qItem.rightCount || 0) + 1;

        AudioFX.pullHeave();

        const ranked = getSortedFastestLeaderboard();
        const myRankIdx = ranked.findIndex(x => x.id === pObj.id) + 1;

        sendCloudMessage({
          type: 'FAST_ANSWER_RESULT',
          playerId: pObj.id,
          qIndex: matchState.globalQIndex,
          isCorrect: true,
          gainedPts: gainedPts,
          elapsedSec: studentElapsedSec,
          totalScore: pObj.fastScore,
          rank: myRankIdx,
          grade: getConvertedGradeByRank(myRankIdx, pObj.fastScore).grade
        });

        update3DLabelsStatusOnly();
        updateHostHUD();
        renderHostQuestionShowcase();
        window.renderFastestLiveLeaderboard();
        window.broadcastTeamSyncState();

        const totalP = matchState.redPlayers.length + matchState.bluePlayers.length;
        const doneP = matchState.redAnsweredIds.length + matchState.blueAnsweredIds.length;
        if (totalP > 0 && doneP >= totalP && !window.fastestQuestionTransitioning) {
          window.fastestQuestionTransitioning = true;
          window.stopFastestQuestionTimer();
          handleFastestQuestionTimeoutOrAllDone();
        }
        return;
      }
      else if (d.type === 'FREEZE_WRONG') {
        const pObj = registerOrGetPlayer(d.playerId, d.team, d.playerName, true);
        if (matchState.status !== 'PLAYING') return;
        if (d.qIndex !== matchState.globalQIndex) return;

        const alreadyAnswered = matchState.redAnsweredIds.includes(pObj.id) || matchState.blueAnsweredIds.includes(pObj.id);
        if (alreadyAnswered) return;

        if (pObj.team === 'RED') matchState.redAnsweredIds.push(pObj.id);
        else matchState.blueAnsweredIds.push(pObj.id);

        pObj.freeze = (pObj.freeze || 0) + 1;
        pObj.lastDelta = 0;
        pObj.lastTimeSec = null;

        const qItem = quizList[matchState.globalQIndex % quizList.length];
        if (qItem) qItem.wrongCount = (qItem.wrongCount || 0) + 1;

        AudioFX.freezeCrack();

        const ranked = getSortedFastestLeaderboard();
        const myRankIdx = ranked.findIndex(x => x.id === pObj.id) + 1;

        sendCloudMessage({
          type: 'FAST_ANSWER_RESULT',
          playerId: pObj.id,
          qIndex: matchState.globalQIndex,
          isCorrect: false,
          gainedPts: 0,
          totalScore: pObj.fastScore || 0,
          rank: myRankIdx,
          grade: getConvertedGradeByRank(myRankIdx, pObj.fastScore || 0).grade
        });

        update3DLabelsStatusOnly();
        updateHostHUD();
        renderHostQuestionShowcase();
        window.renderFastestLiveLeaderboard();
        window.broadcastTeamSyncState();

        const totalP = matchState.redPlayers.length + matchState.bluePlayers.length;
        const doneP = matchState.redAnsweredIds.length + matchState.blueAnsweredIds.length;
        if (totalP > 0 && doneP >= totalP && !window.fastestQuestionTransitioning) {
          window.fastestQuestionTransitioning = true;
          window.stopFastestQuestionTimer();
          handleFastestQuestionTimeoutOrAllDone();
        }
        return;
      }
      else if (d.type === 'FREEZE_DONE_NEXT') {
        return;
      }
    }

    let prevEliminatedMap = {};
    if (typeof matchState !== 'undefined') {
      [...matchState.redPlayers, ...matchState.bluePlayers].forEach(p => {
        prevEliminatedMap[p.id] = !!p.eliminated;
      });
    }

    origHandleHostIncoming(d);

    if (typeof matchState !== 'undefined' && d && d.type === 'FREEZE_WRONG') {
      const qKey = matchState.globalQIndex;
      if (!window.eliminatedHistoryByQ[qKey]) window.eliminatedHistoryByQ[qKey] = [];

      [...matchState.redPlayers, ...matchState.bluePlayers].forEach(p => {
        if (p.eliminated && !prevEliminatedMap[p.id]) {
          if (!window.eliminatedHistoryByQ[qKey].includes(p.id)) {
            window.eliminatedHistoryByQ[qKey].push(p.id);
          }
          window.lastEliminatedBatchIds = [...window.eliminatedHistoryByQ[qKey]];
        }
      });
      updateRescueButtonsBadge();
    }
  };

  /* =====================================================================
     PHẦN 6: KẾT THÚC TRÒ CHƠI & HIỂN THỊ BẢNG VINH DANH + CHO ĐIỂM HỆ 10
     ===================================================================== */
  const origEndMatchManual = window.endMatchManual;
  window.endMatchManual = function() {
    window.stopFastestQuestionTimer();
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const ranked = getSortedFastestLeaderboard();
      const champName = ranked.length > 0 && ranked[0].fastScore > 0
        ? `⚡ QUÁN QUÂN TỐC ĐỘ: ${ranked[0].label.toUpperCase()} (${ranked[0].fastScore}Đ)`
        : 'KẾT THÚC ĐẤU TRƯỜNG AI NHANH NHẤT';
      finishMatch(champName);
      return;
    }
    origEndMatchManual();
  };

  const origFinishMatch = window.finishMatch;
  window.finishMatch = function(winner) {
    window.stopFastestQuestionTimer();
    origFinishMatch(winner);

    const podiumBox = document.getElementById('fast-final-podium-box');
    const vicRescueBtn = document.getElementById('vic-rescue-btn');
    if (vicRescueBtn && typeof matchState !== 'undefined') {
      vicRescueBtn.style.display = (matchState.gameType === 'BELL') ? 'inline-block' : 'none';
    }
    if (!podiumBox) return;

    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      const ranked = getSortedFastestLeaderboard();
      document.getElementById('win-sub-txt').innerHTML =
        `🌟 <b>BẢNG VINH DANH CHUNG CUỘC & QUY ĐỔI ĐIỂM SỐ:</b> ` +
        `<span style="color:#fef08a;">Hạng 1–3: <b>10đ</b> • Hạng 4–6: <b>9đ</b> • Hạng 7–10: <b>8đ</b> • Hạng 11–15: <b>7đ</b></span>`;

      const top15 = ranked.slice(0, 15);
      if (top15.length === 0) {
        podiumBox.innerHTML = `<div style="text-align:center; padding:14px; color:#94a3b8;">Chưa có thí sinh nào ghi điểm trong trận đấu này.</div>`;
      } else {
        const rowsHTML = top15.map((p, idx) => {
          const r = idx + 1;
          const medal = r === 1 ? '🥇 Hạng 1' : (r === 2 ? '🥈 Hạng 2' : (r === 3 ? '🥉 Hạng 3' : `Hạng ${r}`));
          const gInfo = getConvertedGradeByRank(r, p.fastScore);
          const groupTag = r <= 10 ? '<span style="color:#38bdf8;">[TOP 10]</span>' : '<span style="color:#c084fc;">[Hạng 11-15]</span>';
          return `
            <tr>
              <td><b>${medal}</b> ${groupTag}</td>
              <td style="color:#fef08a;">${p.label}</td>
              <td>${p.correct} đúng / ${p.wrong} sai</td>
              <td style="color:#38bdf8; font-weight:900;">${p.fastScore} điểm</td>
              <td><span class="grade-pill ${gInfo.css}">${gInfo.label}</span></td>
            </tr>
          `;
        }).join('');

        podiumBox.innerHTML = `
          <table class="ffp-table">
            <thead>
              <tr>
                <th>Thứ hạng</th>
                <th>Họ và Tên Thí Sinh</th>
                <th>Kết quả</th>
                <th>Tổng điểm tốc độ</th>
                <th>Điểm quy đổi</th>
              </tr>
            </thead>
            <tbody>${rowsHTML}</tbody>
          </table>
        `;
      }
      podiumBox.style.display = 'block';

      sendCloudMessage({
        type: 'FAST_FINAL_CEREMONY',
        winner: winner,
        rankings: ranked.slice(0, 15).map((p, i) => ({
          id: p.id,
          rank: i + 1,
          label: p.label,
          fastScore: p.fastScore,
          grade: getConvertedGradeByRank(i + 1, p.fastScore).grade
        }))
      });
    } else {
      podiumBox.style.display = 'none';
    }
  };

  const origDownloadCSV = window.downloadCSVReport;
  window.downloadCSVReport = function() {
    if (typeof matchState !== 'undefined' && matchState.gameType === 'FAST') {
      let csv = "Thứ hạng,Họ và Tên Học Sinh,Số câu đúng,Số câu sai,Tổng Điểm Tốc Độ,Điểm Quy Đổi (Hệ 10),Nhóm Vinh Danh\n";
      const ranked = getSortedFastestLeaderboard();
      ranked.forEach((p, idx) => {
        const rank = idx + 1;
        const gInfo = getConvertedGradeByRank(rank, p.fastScore);
        const tier = rank <= 3 ? "Top 1-3 (10 điểm)" : (rank <= 6 ? "Top 4-6 (9 điểm)" : (rank <= 10 ? "Top 7-10 (8 điểm)" : (rank <= 15 ? "Hạng 11-15 (7 điểm)" : "Tham gia")));
        csv += `${rank},"${p.label}",${p.correct},${p.wrong},${p.fastScore},${gInfo.grade},"${tier}"\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `bang_diem_Ai_Nhanh_Nhat_THPT_Mang_Thit_${Date.now()}.csv`;
      a.click();
      return;
    }
    origDownloadCSV();
  };

  /* =====================================================================
     PHẦN 7: LOGIC ĐIỆN THOẠI HỌC SINH CHO CHẾ ĐỘ "AI NHANH NHẤT"
     ===================================================================== */
  let mobileClientMode = 'TUG';

  function startMobileFastCountdown(durationSec) {
    if (window.fastestMobileTimer) clearInterval(window.fastestMobileTimer);
    const wrap = document.getElementById('mobile-fast-timer-wrap');
    if (mobileClientMode !== 'FAST') {
      if (wrap) wrap.style.display = 'none';
      return;
    }
    if (wrap) wrap.style.display = 'block';
    window.fastestMobileStartMs = Date.now();
    const totalSec = durationSec || FASTEST_Q_DURATION_SEC;
    const fill = document.getElementById('mobile-fast-timer-fill');
    const txt = document.getElementById('mobile-fast-timer-txt');

    window.fastestMobileTimer = setInterval(() => {
      const elapsed = (Date.now() - window.fastestMobileStartMs) / 1000;
      const rem = Math.max(0, totalSec - elapsed);
      const pct = (rem / totalSec) * 100;
      if (fill) {
        fill.style.width = `${pct}%`;
        fill.style.background = rem > 10 ? '#10b981' : (rem > 5 ? '#f59e0b' : '#ef4444');
      }
      if (txt) {
        txt.innerText = rem > 0
          ? `⏱️ Còn ${rem.toFixed(1)}s • Trả lời càng nhanh điểm càng cao!`
          : `⌛ Hết 20 giây (0 điểm) • Chờ câu tiếp theo...`;
      }
      if (rem <= 0) {
        clearInterval(window.fastestMobileTimer);
        document.querySelectorAll('#m-q-options .btn-ans').forEach(b => {
          b.disabled = true;
          b.classList.add('locked-choice');
        });
      }
    }, 100);
  }

  const origInitMobile = window.initMobilePlayer;
  window.initMobilePlayer = function(roomParam, teamParam, subjParam, gmParam) {
    if (gmParam === 'F' || gmParam === 'FAST') {
      mobileClientMode = 'FAST';
    } else if (gmParam === 'B' || gmParam === 'BELL') {
      mobileClientMode = 'BELL';
    } else {
      mobileClientMode = 'TUG';
    }
    origInitMobile(roomParam, teamParam, subjParam, gmParam);
    window.updateLobbyInfoBanner();
  };

  const origUpdateLobbyBanner = window.updateLobbyInfoBanner;
  window.updateLobbyInfoBanner = function() {
    if (mobileClientMode === 'FAST') {
      const manualBox = document.getElementById('manual-team-box');
      if (manualBox) manualBox.style.display = 'none';
      const info = document.getElementById('assigned-info');
      if (info) {
        info.innerHTML = `
          Chế độ: <b style="color:#fef08a; font-size:16px;">⚡ AI NHANH NHẤT 3D (20 GIÂY/CÂU)</b><br>
          <span style="font-size:12.5px; color:#a7f3d0;">Đúng & nhanh nhất: <b>1.000đ</b>, giảm dần theo giây • Sai/Hết giờ: <b>0đ</b><br>🏆 Hạng 1-3: <b>10đ</b> | Hạng 4-6: <b>9đ</b> | Hạng 7-10: <b>8đ</b> | Hạng 11-15: <b>7đ</b></span>
        `;
      }
      return;
    }
    origUpdateLobbyBanner();
  };

  const origMoveToReady = window.moveToReadyScreen;
  window.moveToReadyScreen = function() {
    origMoveToReady();
    if (mobileClientMode === 'FAST') {
      const badge = document.getElementById('m-role-badge');
      if (badge) {
        badge.innerText = '⚡ ĐUA TỐC ĐỘ';
        badge.style.background = '#9333ea';
      }
      const livesEl = document.getElementById('m-lives-streak');
      if (livesEl) livesEl.style.display = 'none';
      const stat = document.getElementById('m-rope-stat');
      if (stat) {
        stat.innerText = `Tổng: ${window.myFastestTotalScore || 0}đ ${window.myFastestRank ? `(#${window.myFastestRank})` : ''}`;
      }
    }
  };

  const origActivateMobileQuiz = window.activateMobileQuiz;
  window.activateMobileQuiz = function() {
    origActivateMobileQuiz();
    if (mobileClientMode === 'FAST') {
      if (lastCompletedQIndex === currentGlobalQIndex) {
        const banner = document.getElementById('preview-lock-banner');
        if (banner) {
          banner.style.display = 'block';
          banner.innerHTML = `✅ <b>ĐÃ GHI NHẬN CÂU TRẢ LỜI #${currentGlobalQIndex + 1}!</b><br><span>Tổng điểm của em: <b style="color:#4ade80;">${window.myFastestTotalScore} điểm</b> ${window.myFastestRank ? `• Xếp hạng: <b>#${window.myFastestRank}</b>` : ''} — Đang chờ hết 20 giây để mở câu mới...</span>`;
        }
      } else {
        startMobileFastCountdown(FASTEST_Q_DURATION_SEC);
      }
    }
  };

  const origCheckMobileAnswer = window.checkMobileAnswer;
  window.checkMobileAnswer = function(isCorrect) {
    if (mobileClientMode === 'FAST') {
      if (lastCompletedQIndex === currentGlobalQIndex) return;
      const elapsedSec = Math.max(0.08, (Date.now() - (window.fastestMobileStartMs || Date.now())) / 1000);
      if (elapsedSec > FASTEST_Q_DURATION_SEC + 0.5) return;

      const name = getCleanStudentName() || 'Học sinh';
      const answeredQ = currentGlobalQIndex;
      lastCompletedQIndex = answeredQ;

      document.querySelectorAll('#m-q-options .btn-ans').forEach(b => {
        b.disabled = true;
        b.classList.add('locked-choice');
      });

      if (isCorrect) {
        if (navigator.vibrate) navigator.vibrate(50);
        sendCloudMessage({
          type: 'PULL_CORRECT',
          playerId: myPlayerId,
          team: selectedTeam,
          playerName: name,
          qIndex: answeredQ,
          elapsedSec: elapsedSec
        });
      } else {
        if (navigator.vibrate) navigator.vibrate([80, 50, 80]);
        sendCloudMessage({
          type: 'FREEZE_WRONG',
          playerId: myPlayerId,
          team: selectedTeam,
          playerName: name,
          qIndex: answeredQ,
          elapsedSec: elapsedSec
        });
      }
      return;
    }
    origCheckMobileAnswer(isCorrect);
  };

  const origHandleMobileIncoming = window.handleMobileIncomingData;
  window.handleMobileIncomingData = function(d) {
    if (d && d.gameType) {
      mobileClientMode = d.gameType;
      window.updateLobbyInfoBanner();
    }

    if (d && d.type === 'FAST_QUESTION_START') {
      mobileClientMode = 'FAST';
      currentGlobalQIndex = d.globalQIndex;
      renderedMobileQIndex = -1;
      moveToReadyScreen();
      activateMobileQuiz();
      startMobileFastCountdown(d.durationSec || FASTEST_Q_DURATION_SEC);
      return;
    }

    if (d && d.type === 'FAST_ANSWER_RESULT' && d.playerId === myPlayerId) {
      window.myFastestTotalScore = d.totalScore || 0;
      window.myFastestLastGain = d.gainedPts || 0;
      window.myFastestRank = d.rank || 0;

      const stat = document.getElementById('m-rope-stat');
      if (stat) {
        stat.innerText = `⚡ ${window.myFastestTotalScore}đ | Hạng #${window.myFastestRank}`;
      }

      const banner = document.getElementById('preview-lock-banner');
      if (banner) {
        banner.style.display = 'block';
        if (d.isCorrect) {
          banner.innerHTML = `🎉 <b>CHÍNH XÁC TRONG ${d.elapsedSec.toFixed(2)} GIÂY! (+${d.gainedPts} ĐIỂM)</b><br><span>Tổng điểm: <b style="color:#4ade80;">${d.totalScore}đ</b> • Hạng hiện tại: <b style="color:#fef08a;">#${d.rank}</b> (Tương ứng <b>${d.grade} điểm</b>)</span>`;
        } else {
          banner.innerHTML = `❌ <b>TRẢ LỜI SAI! (+0 ĐIỂM)</b><br><span>Tổng điểm: <b>${d.totalScore}đ</b> • Hạng hiện tại: <b>#${d.rank}</b> — Hãy chuẩn bị gỡ điểm ở câu tiếp theo!</span>`;
        }
      }
      return;
    }

    if (d && d.type === 'FAST_LEADERBOARD_SYNC') {
      if (d.allRanks && Array.isArray(d.allRanks)) {
        const me = d.allRanks.find(x => x.id === myPlayerId);
        if (me) {
          window.myFastestTotalScore = me.fastScore;
          window.myFastestRank = me.rank;
          const stat = document.getElementById('m-rope-stat');
          if (stat) stat.innerText = `⚡ ${me.fastScore}đ | Hạng #${me.rank} (${me.grade}đ)`;
        }
      }
      return;
    }

    if (d && d.type === 'FAST_FINAL_CEREMONY') {
      if (window.fastestMobileTimer) clearInterval(window.fastestMobileTimer);
      const ov = document.getElementById('waiting-host-overlay');
      const quizCon = document.getElementById('active-quiz-container');
      if (quizCon) quizCon.style.display = 'none';
      if (ov) {
        ov.style.display = 'flex';
        const me = (d.rankings || []).find(x => x.id === myPlayerId);
        const mySummary = me
          ? `<div style="background:#0f172a; border:2px solid #fef08a; padding:12px; border-radius:14px; margin:10px 0;">
               <div style="font-size:18px; color:#fef08a; font-weight:900;">THÀNH TÍCH CỦA EM: HẠNG #${me.rank}</div>
               <div style="font-size:15px; color:#38bdf8; margin:4px 0;">Tổng điểm tốc độ: <b>${me.fastScore} điểm</b></div>
               <div style="font-size:20px; color:#4ade80; font-weight:900;">🎯 ĐIỂM ĐƯỢC NHẬN: ${me.grade} ĐIỂM</div>
             </div>`
          : `<p style="color:#cbd5e1;">Tổng điểm của em: <b>${window.myFastestTotalScore} điểm</b></p>`;

        ov.innerHTML = `
          <div style="font-size:46px;">🏆</div>
          <h2 style="color:#fef08a; margin:4px 0;">${d.winner}</h2>
          ${mySummary}
          <p style="font-size:13px; color:#94a3b8;">Hãy nhìn lên màn hình chính để xem Bảng Vinh Danh Top 10 & Hạng 11–15!</p>
        `;
      }
      return;
    }

    // Nếu đang ở chế độ FAST, giữ nguyên trạng thái khi nhận HOST_HEARTBEAT
    if (mobileClientMode === 'FAST' && d && d.type === 'HOST_HEARTBEAT') {
      if (!hasConfirmedEnter) sendEnterRequest();
      if (typeof d.globalQIndex === 'number' && d.globalQIndex !== currentGlobalQIndex) {
        currentGlobalQIndex = d.globalQIndex;
        renderedMobileQIndex = -1;
        if (d.status === 'PLAYING') {
          moveToReadyScreen();
          activateMobileQuiz();
        }
      }
      return;
    }

    origHandleMobileIncoming(d);

    if (d && d.type === 'PLAYER_LIVES_SYNC' && d.playerId === myPlayerId && d.rescuedNow) {
      myEliminated = false;
      myLives = d.lives || 1;
      myStreak = 0;
      if (typeof updateMobileLivesHeader === 'function') updateMobileLivesHeader();
      if (typeof activateMobileQuiz === 'function') activateMobileQuiz();

      const toast = document.getElementById('bonus-life-toast');
      if (toast) {
        toast.innerHTML = '🛟 THẦY ĐÃ CỨU TRỢ HỒI SINH EM TRỞ LẠI SÀN ĐẤU! (❤️)';
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      }
    }
  };

  /* =====================================================================
     PHẦN 8: TÍNH NĂNG CỨU TRỢ & HỒI SINH (RUNG CHUÔNG VÀNG)
     ===================================================================== */
  function revivePlayersByIdList(idList, announcementTitle) {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const revivedNames = [];

    allP.forEach(p => {
      if (idList.includes(p.id) && p.eliminated) {
        p.eliminated = false;
        p.lives = Math.max(1, p.lives || 1);
        p.streak = 0;
        revivedNames.push(p.label);

        if (typeof sendCloudMessage === 'function') {
          sendCloudMessage({
            type: 'PLAYER_LIVES_SYNC',
            playerId: p.id,
            lives: p.lives,
            streak: 0,
            eliminated: false,
            rescuedNow: true,
            matchStatus: matchState.status,
            globalQIndex: matchState.globalQIndex
          });
        }
      }
    });

    if (revivedNames.length === 0) {
      alert("Hiện chưa có thí sinh nào nằm trong diện bị loại để hồi sinh!");
      return;
    }

    if (matchState.status === 'ENDED') {
      matchState.status = 'PLAYING';
      const vModal = document.getElementById('victory-modal');
      if (vModal) vModal.style.display = 'none';
      if (typeof giantTrophy3D !== 'undefined' && giantTrophy3D) {
        giantTrophy3D.visible = false;
        giantTrophy3D.userData.active = false;
      }
      if (typeof sendCloudMessage === 'function') {
        sendCloudMessage({ type: 'MATCH_STATE', status: 'PLAYING' });
      }
    }

    if (typeof rebuildAll3DCharacters === 'function') rebuildAll3DCharacters();
    if (typeof updateHostHUD === 'function') updateHostHUD();
    if (typeof renderHostQuestionShowcase === 'function') renderHostQuestionShowcase();
    if (typeof broadcastTeamSyncState === 'function') broadcastTeamSyncState();

    updateRescueButtonsBadge();
    showRescueBanner(`${announcementTitle}<br><span style="font-size:14.5px; color:#fef08a;">Đã hồi sinh (${revivedNames.length} HS): ${revivedNames.join(', ')}</span>`);
  }

  window.rescueLastEliminatedBatch = function() {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const currentlyEliminated = allP.filter(x => x.eliminated);

    if (currentlyEliminated.length === 0) {
      return alert("Hiện tại tất cả thí sinh đều đang còn trên sàn đấu, chưa có ai bị loại!");
    }

    const qCur = matchState.globalQIndex;
    let targetIds = [];
    if (window.eliminatedHistoryByQ[qCur] && window.eliminatedHistoryByQ[qCur].length > 0) {
      targetIds = window.eliminatedHistoryByQ[qCur];
    } else if (window.eliminatedHistoryByQ[qCur - 1] && window.eliminatedHistoryByQ[qCur - 1].length > 0) {
      targetIds = window.eliminatedHistoryByQ[qCur - 1];
    } else if (window.lastEliminatedBatchIds && window.lastEliminatedBatchIds.length > 0) {
      targetIds = window.lastEliminatedBatchIds;
    } else {
      targetIds = currentlyEliminated.map(x => x.id);
    }

    const validIds = targetIds.filter(id => currentlyEliminated.some(p => p.id === id));
    const finalIds = validIds.length > 0 ? validIds : currentlyEliminated.map(x => x.id);

    revivePlayersByIdList(finalIds, `🛟 CỨU TRỢ THÀNH CÔNG LƯỢT VỪA RỒI!`);
  };

  window.rescueRandomFivePlayers = function() {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const eliminatedPool = allP.filter(x => x.eliminated);

    if (eliminatedPool.length === 0) {
      return alert("Hiện tại chưa có thí sinh nào bị loại để bốc thăm hồi sinh!");
    }

    const shuffled = [...eliminatedPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const picked5Ids = shuffled.slice(0, 5).map(x => x.id);

    revivePlayersByIdList(picked5Ids, `🎲 BỐC THĂM HỒI SINH NGẪU NHIÊN ${picked5Ids.length} THÍ SINH!`);
  };

  function injectRescueButtonsUI() {
    injectFastestGameUI();

    const controlsRow = document.querySelector('.host-controls-row');
    if (controlsRow && !document.getElementById('updat-rescue-box')) {
      const group = document.createElement('div');
      group.id = 'updat-rescue-box';
      group.className = 'rescue-btn-group';
      group.innerHTML = `
        <button class="btn-rescue-batch" id="btn-rescue-last" onclick="rescueLastEliminatedBatch()" title="Hồi sinh toàn bộ thí sinh vừa bị loại ở câu hỏi khó vừa rồi">
          🛟 Cứu Trợ Lượt Vừa Rồi
        </button>
        <button class="btn-rescue-random5" id="btn-rescue-rand5" onclick="rescueRandomFivePlayers()" title="Chọn ngẫu nhiên 5 học sinh đã bị loại để hồi sinh">
          🎲 Hồi Sinh Ngẫu Nhiên 5 HS
        </button>
      `;
      const nextQBtn = controlsRow.querySelector('button[onclick*="forceAdvanceGlobalQuestion"]');
      if (nextQBtn && nextQBtn.nextSibling) {
        controlsRow.insertBefore(group, nextQBtn.nextSibling);
      } else {
        controlsRow.appendChild(group);
      }
    }

    const vicModal = document.getElementById('victory-modal');
    if (vicModal && !document.getElementById('vic-rescue-btn')) {
      const btnContainer = vicModal.querySelector('div:last-child');
      if (btnContainer) {
        const rBtn = document.createElement('button');
        rBtn.id = 'vic-rescue-btn';
        rBtn.className = 'btn-rescue-batch';
        rBtn.style.padding = '9px 14px';
        rBtn.style.fontSize = '13px';
        rBtn.innerHTML = '🛟 CỨU TRỢ HỒI SINH ĐẤU TIẾP';
        rBtn.onclick = () => window.rescueLastEliminatedBatch();
        btnContainer.insertBefore(rBtn, btnContainer.firstChild);
      }
    }
  }

  function updateRescueButtonsBadge() {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const outCount = allP.filter(x => x.eliminated).length;
    const btnLast = document.getElementById('btn-rescue-last');
    if (btnLast) {
      btnLast.innerHTML = outCount > 0
        ? `🛟 Cứu Trợ Lượt Vừa Rồi (${outCount} HS bị loại)`
        : `🛟 Cứu Trợ Lượt Vừa Rồi`;
    }
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', injectRescueButtonsUI);
  } else {
    injectRescueButtonsUI();
  }
})();
