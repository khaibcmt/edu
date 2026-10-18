/* =========================================================================
   SIÊU BẢN NÂNG CẤP TẤT CẢ TRONG MỘT (ALL-IN-ONE MODULE): updat.js
   Tác giả: Thầy Hồ Tấn Khải – Trường THPT Mang Thít
   Bao gồm đầy đủ 100% tính năng:
   1. Giao diện 3D Game Show, Tên trò chơi 3D ánh kim, Nền cực quang chuyển động.
   2. Đưa thanh điều hướng câu hỏi xuống cuối trang màn hình.
   3. Nút Cứu Trợ Rung Chuông Vàng (Hồi sinh lượt vừa rồi & Ngẫu nhiên 5 HS).
   4. CHẾ ĐỘ MỚI SỐ 3: ⚡ AI NHANH NHẤT (20 giây/câu, tính điểm tốc độ,
      Bảng Top 10 Realtime, Quy đổi điểm Hạng 1-3: 10đ, 4-6: 9đ, 7-10: 8đ, 11-15: 7đ).
   ========================================================================= */

(function initSuperArenaAllInOne() {
  // 1. NHÚNG TOÀN BỘ CSS 3D GAME SHOW & GIAO DIỆN "AI NHANH NHẤT"
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

    #top-author-banner {
      height: 50px !important;
      background: linear-gradient(180deg, #1e1b4b 0%, #0f172a 65%, #060913 100%) !important;
      border-bottom: 4px solid #d97706 !important;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.65), inset 0 2px 3px rgba(255, 255, 255, 0.25) !important;
      padding: 0 16px !important;
    }
    .game-logo-svg {
      width: 34px !important; height: 34px !important;
      animation: logoFloat3D 3.2s ease-in-out infinite !important;
    }
    .brand-title {
      font-size: 17.5px !important; font-weight: 900 !important; letter-spacing: 0.7px !important;
      text-transform: uppercase !important;
      background: linear-gradient(90deg, #fef08a 0%, #ffffff 25%, #38bdf8 50%, #fbbf24 75%, #fef08a 100%) !important;
      background-size: 200% auto !important;
      -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important;
      animation: textShineSweep 4.5s linear infinite !important;
      filter: drop-shadow(0px 1px 0px #b45309) drop-shadow(0px 2px 0px #92400e) drop-shadow(0px 4px 6px rgba(0,0,0,0.8)) !important;
    }
    .author-badge {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 100%) !important;
      color: #0f172a !important; border: 1.5px solid #ffffff !important; border-bottom: 4px solid #b45309 !important;
      padding: 4px 13px !important; border-radius: 20px !important; font-size: 12.5px !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.8) !important;
    }
    .school-badge {
      background: linear-gradient(180deg, #34d399 0%, #059669 100%) !important;
      color: #ffffff !important; border: 1.5px solid #a7f3d0 !important; border-bottom: 4px solid #065f46 !important;
      padding: 4px 13px !important; border-radius: 20px !important; font-size: 12.5px !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.5) !important;
    }

    /* Hình nền Cực Quang đa sắc chuyển động */
    #teacher-view {
      top: 50px !important;
      background: linear-gradient(-45deg, #1e1b4b, #0f172a, #0369a1, #4c1d95, #065f46, #7c2d12) !important;
      background-size: 400% 400% !important;
      animation: bgAuroraFlow 14s ease infinite !important;
      padding: 16px !important;
    }
    .setup-box {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.96) 100%) !important;
      border: 3px solid #ffffff !important; border-bottom: 8px solid #cbd5e1 !important;
      border-radius: 26px !important;
      box-shadow: 0 22px 55px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.35) !important;
      max-width: 1160px !important;
    }

    /* Lưới 3 Chế độ chơi 3D (Kéo Co - Rung Chuông Vàng - Ai Nhanh Nhất) */
    .gamemode-selector {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 12px !important;
      margin: 10px 0 !important;
    }
    @media (max-width: 900px) {
      .gamemode-selector { grid-template-columns: 1fr !important; }
    }
    .gm-card {
      border-radius: 18px !important;
      border: 2px solid #cbd5e1 !important; border-bottom: 6px solid #94a3b8 !important;
      background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%) !important;
      box-shadow: 0 8px 18px rgba(0,0,0,0.08), inset 0 2px 2px #ffffff !important;
      transition: all 0.18s ease !important; padding: 12px 14px !important;
    }
    .gm-card:hover { transform: translateY(-3px) !important; }
    .gm-card.active-gm {
      background: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%) !important;
      border: 2.5px solid #0284c7 !important; border-bottom: 7px solid #0369a1 !important;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.32) !important;
    }
    .gm-card.bell-gm.active-gm {
      background: linear-gradient(180deg, #fef9c3 0%, #fde047 100%) !important;
      border: 2.5px solid #d97706 !important; border-bottom: 7px solid #b45309 !important;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.38) !important;
    }
    .gm-card.speed-gm.active-gm {
      background: linear-gradient(180deg, #f3e8ff 0%, #d8b4fe 100%) !important;
      border: 2.5px solid #9333ea !important; border-bottom: 7px solid #6b21a8 !important;
      box-shadow: 0 10px 25px rgba(147, 51, 234, 0.38) !important;
    }

    /* Các nút 3D nổi khối */
    .btn-subj {
      border-radius: 11px !important; border: 1.5px solid rgba(255,255,255,0.5) !important;
      border-bottom: 4.5px solid rgba(0, 0, 0, 0.38) !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.18), inset 0 2px 2px rgba(255,255,255,0.45) !important;
      transition: all 0.14s ease !important;
    }
    .btn-subj:hover { transform: translateY(-2px) !important; filter: brightness(1.08) !important; }
    .btn-subj.active-subj {
      border: 2px solid #ffffff !important; border-bottom: 5px solid #0f172a !important;
      transform: translateY(-2px) scale(1.05) !important;
      box-shadow: 0 0 0 3px #f59e0b, 0 8px 18px rgba(0,0,0,0.3) !important;
    }
    .btn-action-sm, .c-btn, .hq-nav-btn {
      border-bottom: 4px solid rgba(0,0,0,0.4) !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.4) !important;
      transition: all 0.12s !important;
    }
    .btn-action-sm:active, .c-btn:active, .hq-nav-btn:active {
      transform: translateY(2px) !important; border-bottom-width: 1.5px !important;
    }
    .btn-launch {
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #1d4ed8 100%) !important;
      border: 2px solid #bae6fd !important; border-bottom: 6px solid #1e3a8a !important;
      box-shadow: 0 10px 24px rgba(2, 132, 199, 0.45), inset 0 2px 3px rgba(255,255,255,0.65) !important;
    }

    /* Đưa thanh thông tin câu hỏi (.hq-header) xuống cuối trang màn hình */
    #host-view { top: 50px !important; }
    #host-question-board {
      display: flex !important; flex-direction: column !important; justify-content: space-between !important;
      padding: 8px 18px 6px 18px !important;
      background: linear-gradient(180deg, #0f172a 0%, #060913 100%) !important;
      border-top: 4px solid #38bdf8 !important;
    }
    #host-question-board .hq-title {
      order: 1 !important; margin-bottom: 6px !important;
      background: linear-gradient(180deg, #312e81 0%, #1e1b4b 100%) !important;
      border: 2.5px solid #a5b4fc !important; border-bottom: 5px solid #0f0728 !important;
    }
    #host-question-board .hq-opts { order: 2 !important; }
    .hq-opt-item, .btn-ans {
      border-top: 2px solid rgba(255,255,255,0.65) !important;
      border-bottom: 6px solid rgba(0,0,0,0.45) !important;
      box-shadow: 0 6px 15px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,255,255,0.35) !important;
    }
    #host-question-board .hq-header {
      order: 3 !important; margin-top: 6px !important; margin-bottom: 0 !important;
      padding: 6px 16px !important;
      background: linear-gradient(180deg, #1e293b 0%, #090d16 100%) !important;
      border: 1.5px solid #38bdf8 !important; border-bottom: 4px solid #0369a1 !important;
      border-radius: 14px !important;
    }

    /* =====================================================================
       THANH ĐẾM NGƯỢC 20 GIÂY & BẢNG VINH DANH TOP 10 REALTIME ("AI NHANH NHẤT")
       ===================================================================== */
    #speed-timer-wrap {
      order: 0 !important;
      width: 100%; height: 22px; background: #1e293b; border-radius: 12px;
      border: 2px solid #f59e0b; overflow: hidden; position: relative;
      margin-bottom: 6px; display: none; box-shadow: inset 0 2px 5px rgba(0,0,0,0.6);
    }
    #speed-timer-bar {
      height: 100%; width: 100%;
      background: linear-gradient(90deg, #10b981, #eab308, #ef4444);
      transition: width 0.1s linear;
    }
    #speed-timer-text {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-size: 12.5px; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px #000;
    }

    /* Bảng Vinh Danh Top 10 Theo Thời Gian Thực trên sân 3D */
    #speed-live-top10 {
      position: absolute; top: 8px; right: 14px; width: 290px;
      background: rgba(9, 13, 22, 0.94); border: 2.5px solid #f59e0b;
      border-bottom: 6px solid #b45309; border-radius: 18px; padding: 10px 12px;
      z-index: 30; display: none; box-shadow: 0 12px 30px rgba(0,0,0,0.75);
      backdrop-filter: blur(8px); max-height: calc(100% - 16px); overflow-y: auto;
    }
    .top10-header {
      font-size: 13px; font-weight: 900; color: #fef08a; text-align: center;
      border-bottom: 1.5px dashed #475569; padding-bottom: 5px; margin-bottom: 6px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .top10-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 4px 8px; border-radius: 8px; margin-bottom: 3px;
      font-size: 12px; font-weight: 800; background: rgba(30, 41, 59, 0.75);
    }
    .top10-row.rank-1 { background: linear-gradient(90deg, #b45309, #f59e0b); color: #000; font-weight: 900; }
    .top10-row.rank-2 { background: linear-gradient(90deg, #475569, #94a3b8); color: #000; font-weight: 900; }
    .top10-row.rank-3 { background: linear-gradient(90deg, #78350f, #d97706); color: #fff; font-weight: 900; }

    /* Bảng Tổng Kết Quy Đổi Điểm Hạng 1 -> 15 Khi Kết Thúc Trò Chơi */
    #speed-final-podium-box {
      max-height: 220px; overflow-y: auto; margin: 10px 0;
      background: #090d16; border: 2px solid #38bdf8; border-radius: 14px; padding: 8px;
      text-align: left; display: none;
    }
    .final-rank-item {
      display: flex; justify-content: space-between; align-items: center;
      padding: 6px 10px; border-bottom: 1px solid #1e293b; font-size: 13.5px; font-weight: 800;
    }
    .grade-pill {
      padding: 2px 10px; border-radius: 12px; font-weight: 900; font-size: 12.5px; color: #000;
    }
    .grade-10 { background: #fde047; box-shadow: 0 0 10px rgba(253,224,71,0.6); }
    .grade-9 { background: #38bdf8; }
    .grade-8 { background: #34d399; }
    .grade-7 { background: #cbd5e1; }

    /* Nút Cứu Trợ 3D */
    .rescue-btn-group { display: inline-flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .btn-rescue-batch {
      background: linear-gradient(180deg, #34d399 0%, #059669 100%) !important;
      color: #fff !important; border: 1.5px solid #a7f3d0 !important; border-bottom: 4px solid #064e3b !important;
      padding: 4px 11px !important; border-radius: 14px !important; font-size: 11.5px !important; font-weight: 900 !important; cursor: pointer !important;
    }
    .btn-rescue-random5 {
      background: linear-gradient(180deg, #fbbf24 0%, #d97706 100%) !important;
      color: #fff !important; border: 1.5px solid #fef08a !important; border-bottom: 4px solid #78350f !important;
      padding: 4px 11px !important; border-radius: 14px !important; font-size: 11.5px !important; font-weight: 900 !important; cursor: pointer !important;
    }
    #rescue-Floating-Banner {
      position: fixed; top: 105px; left: 50%; transform: translateX(-50%);
      background: linear-gradient(180deg, #10b981 0%, #047857 100%);
      border: 3px solid #fef08a; border-bottom: 6px solid #064e3b; color: #fff;
      padding: 12px 28px; border-radius: 30px; font-size: 18px; font-weight: 900;
      z-index: 550; display: none; box-shadow: 0 15px 40px rgba(0,0,0,0.75); text-align: center;
    }
  `;
  document.head.appendChild(styleEl);

  // Banner thông báo nổi
  const rescueBanner = document.createElement('div');
  rescueBanner.id = 'rescue-Floating-Banner';
  document.body.appendChild(rescueBanner);

  function showRescueBanner(msg) {
    rescueBanner.innerHTML = msg;
    rescueBanner.style.display = 'block';
    if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 90, origin: { y: 0.45 } });
    if (typeof AudioFX !== 'undefined' && AudioFX.bonusLifeChime) AudioFX.bonusLifeChime();
    setTimeout(() => { rescueBanner.style.display = 'none'; }, 4000);
  }

  // 2. QUY TẮC QUY ĐỔI ĐIỂM HỌC TẬP THEO THỨ HẠNG (CHẾ ĐỘ "AI NHANH NHẤT")
  // Hạng 1-3: 10 điểm | Hạng 4-6: 9 điểm | Hạng 7-10: 8 điểm | Hạng 11-15: 7 điểm
  function getConvertedGradeByRank(rankNumber) {
    if (rankNumber >= 1 && rankNumber <= 3) return { grade: 10, label: '10 ĐIỂM 🏆', css: 'grade-10' };
    if (rankNumber >= 4 && rankNumber <= 6) return { grade: 9, label: '9 ĐIỂM 🥈', css: 'grade-9' };
    if (rankNumber >= 7 && rankNumber <= 10) return { grade: 8, label: '8 ĐIỂM 🥉', css: 'grade-8' };
    if (rankNumber >= 11 && rankNumber <= 15) return { grade: 7, label: '7 ĐIỂM 🎖️', css: 'grade-7' };
    return { grade: 6, label: 'Khuyến khích', css: 'grade-7' };
  }

  function getSortedSpeedContestants() {
    if (typeof matchState === 'undefined') return [];
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    return allP.sort((a, b) => {
      const scoreDiff = (b.speedScore || 0) - (a.speedScore || 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (b.correct || 0) - (a.correct || 0);
    });
  }

  // 3. ĐỒNG HỒ ĐẾM NGƯỢC 20 GIÂY CHO CHẾ ĐỘ "AI NHANH NHẤT"
  let speedQuestionStartTime = 0;
  let speedTimerInterval = null;
  const SPEED_DURATION_MS = 20000; // 20 giây mỗi câu

  function startSpeed20sCountdown() {
    stopSpeed20sCountdown();
    const wrap = document.getElementById('speed-timer-wrap');
    const bar = document.getElementById('speed-timer-bar');
    const txt = document.getElementById('speed-timer-text');

    if (typeof matchState === 'undefined' || matchState.gameType !== 'SPEED' || matchState.status !== 'PLAYING') {
      if (wrap) wrap.style.display = 'none';
      return;
    }

    if (wrap) wrap.style.display = 'block';
    speedQuestionStartTime = Date.now();

    speedTimerInterval = setInterval(() => {
      if (matchState.status !== 'PLAYING' || matchState.gameType !== 'SPEED') {
        stopSpeed20sCountdown();
        return;
      }
      const elapsed = Date.now() - speedQuestionStartTime;
      const remainMs = Math.max(0, SPEED_DURATION_MS - elapsed);
      const pct = (remainMs / SPEED_DURATION_MS) * 100;
      const remainSec = (remainMs / 1000).toFixed(1);

      if (bar) bar.style.width = `${pct}%`;
      if (txt) txt.innerText = `⏱️ THỜI GIAN CÒN LẠI: ${remainSec} GIÂY (Trả lời càng nhanh điểm càng cao!)`;

      // Khi hết 20 giây: Những ai chưa trả lời sẽ được 0 điểm câu này và tự động chuyển sang câu tiếp theo
      if (remainMs <= 0) {
        stopSpeed20sCountdown();
        advanceNextSpeedQuestionOrEnd();
      }
    }, 100);
  }

  function stopSpeed20sCountdown() {
    if (speedTimerInterval) {
      clearInterval(speedTimerInterval);
      speedTimerInterval = null;
    }
  }

  function advanceNextSpeedQuestionOrEnd() {
    if (typeof matchState === 'undefined' || matchState.gameType !== 'SPEED') return;
    if (matchState.globalQIndex + 1 >= quizList.length) {
      // Đã đi hết toàn bộ bộ câu hỏi -> Kết thúc trò chơi và trao điểm Top 10 & Top 15!
      const sorted = getSortedSpeedContestants();
      const champName = sorted.length > 0 ? sorted[0].label.toUpperCase() : 'AI NHANH NHẤT';
      finishMatch(`⚡ QUÁN QUÂN TỐC ĐỘ: ${champName}`);
    } else {
      matchState.globalQIndex++;
      matchState.redAnsweredIds = [];
      matchState.blueAnsweredIds = [];
      if (typeof update3DLabelsStatusOnly === 'function') update3DLabelsStatusOnly();
      if (typeof updateHostHUD === 'function') updateHostHUD();
      if (typeof renderHostQuestionShowcase === 'function') renderHostQuestionShowcase();
      if (typeof broadcastTeamSyncState === 'function') broadcastTeamSyncState();
      startSpeed20sCountdown();
    }
  }

  // Cập nhật Bảng Vinh Danh Top 10 Theo Thời Gian Thực
  function renderLiveTop10Leaderboard() {
    const box = document.getElementById('speed-live-top10');
    if (!box || typeof matchState === 'undefined') return;

    if (matchState.gameType !== 'SPEED') {
      box.style.display = 'none';
      return;
    }
    box.style.display = 'block';

    const sorted = getSortedSpeedContestants().slice(0, 10);
    const listContainer = document.getElementById('speed-top10-rows');
    if (!listContainer) return;

    if (sorted.length === 0) {
      listContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; font-size:11.5px; padding:8px;">Đang chờ thí sinh ghi điểm...</div>`;
      return;
    }

    listContainer.innerHTML = sorted.map((p, idx) => {
      const rank = idx + 1;
      const gInfo = getConvertedGradeByRank(rank);
      const rankClass = rank <= 3 ? `rank-${rank}` : '';
      const medal = rank === 1 ? '🥇' : (rank === 2 ? '🥈' : (rank === 3 ? '🥉' : `#${rank}`));
      return `
        <div class="top10-row ${rankClass}">
          <span>${medal} ${p.label}</span>
          <span><b>${p.speedScore || 0}</b> đ <small style="opacity:0.85;">(${gInfo.grade}đ)</small></span>
        </div>
      `;
    }).join('');
  }

  // Hiển thị danh sách Top 10 & Hạng 11-15 kèm điểm số 10đ, 9đ, 8đ, 7đ khi kết thúc
  function renderFinalSpeedGradingModal() {
    const podiumBox = document.getElementById('speed-final-podium-box');
    if (!podiumBox || typeof matchState === 'undefined') return;

    if (matchState.gameType !== 'SPEED') {
      podiumBox.style.display = 'none';
      return;
    }

    const sorted = getSortedSpeedContestants().slice(0, 15);
    podiumBox.style.display = 'block';
    if (sorted.length === 0) {
      podiumBox.innerHTML = `<div style="text-align:center; color:#cbd5e1; padding:10px;">Chưa có dữ liệu thí sinh.</div>`;
      return;
    }

    podiumBox.innerHTML = `
      <div style="text-align:center; font-weight:900; color:#fef08a; font-size:14px; margin-bottom:6px; border-bottom:1px dashed #334155; padding-bottom:4px;">
        📊 BẢNG QUY ĐỔI ĐIỂM SỐ TOP 10 & HẠNG 11 - 15
      </div>
      ${sorted.map((p, idx) => {
        const rank = idx + 1;
        const gInfo = getConvertedGradeByRank(rank);
        const medal = rank === 1 ? '🥇 Hạng 1' : (rank === 2 ? '🥈 Hạng 2' : (rank === 3 ? '🥉 Hạng 3' : `Hạng ${rank}`));
        return `
          <div class="final-rank-item">
            <span><b style="color:#38bdf8;">${medal}:</b>${p.label} <small style="color:#94a3b8;">(${p.correct} câu đúng - ${p.speedScore || 0} điểm tốc độ)</small></span>
            <span class="grade-pill ${gInfo.css}">${gInfo.label}</span>
          </div>
        `;
      }).join('')}
    `;
  }

  // 4. BỔ SUNG THẺ CHỌN CHẾ ĐỘ 3 "⚡ AI NHANH NHẤT" VÀO MÀN HÌNH CÀI ĐẶT
  function injectSpeedModeUIAndHooks() {
    const tugCardIcon = document.querySelector('#gm-card-TUG .gm-icon');
    if (tugCardIcon) tugCardIcon.innerHTML = '⚔️';

    // Thêm thẻ Chế độ 3: Ai Nhanh Nhất
    const gmSelector = document.querySelector('.gamemode-selector');
    if (gmSelector && !document.getElementById('gm-card-SPEED')) {
      const speedCard = document.createElement('div');
      speedCard.className = 'gm-card speed-gm';
      speedCard.id = 'gm-card-SPEED';
      speedCard.onclick = () => window.selectGamePlayType('SPEED');
      speedCard.innerHTML = `
        <div class="gm-icon">⚡</div>
        <div class="gm-info">
          <h3>CHẾ ĐỘ 3: AI NHANH NHẤT (ĐUA TỐC ĐỘ 20s)</h3>
          <p>Mỗi câu 20 giây: Đúng & nhanh nhất trọn 1000đ, giảm dần theo giây (Sai/Không trả lời = 0đ). Bảng Top 10 Realtime. <b>Top 1-3: 10đ, 4-6: 9đ, 7-10: 8đ, 11-15: 7đ!</b></p>
        </div>
      `;
      gmSelector.appendChild(speedCard);
    }

    // Ghi đè hàm selectGamePlayType để hỗ trợ 3 chế độ: TUG, BELL, SPEED
    window.selectGamePlayType = function(type) {
      window.currentGamePlayType = type;
      const cTug = document.getElementById('gm-card-TUG');
      const cBell = document.getElementById('gm-card-BELL');
      const cSpeed = document.getElementById('gm-card-SPEED');
      if (cTug) cTug.classList.toggle('active-gm', type === 'TUG');
      if (cBell) cBell.classList.toggle('active-gm', type === 'BELL');
      if (cSpeed) cSpeed.classList.toggle('active-gm', type === 'SPEED');
    };

    // Chèn thanh đếm ngược 20s vào Bảng câu hỏi
    const qBoard = document.getElementById('host-question-board');
    if (qBoard && !document.getElementById('speed-timer-wrap')) {
      const tWrap = document.createElement('div');
      tWrap.id = 'speed-timer-wrap';
      tWrap.innerHTML = `<div id="speed-timer-bar"></div><div id="speed-timer-text">⏱️ 20.0 GIÂY</div>`;
      qBoard.insertBefore(tWrap, qBoard.firstChild);
    }

    // Chèn Bảng Vinh Danh Top 10 Realtime vào góc phải Sân 3D
    const vp3d = document.getElementById('arena-3d-viewport');
    if (vp3d && !document.getElementById('speed-live-top10')) {
      const lb = document.createElement('div');
      lb.id = 'speed-live-top10';
      lb.innerHTML = `
        <div class="top10-header">⚡ BẢNG VINH DANH TOP 10 REALTIME</div>
        <div id="speed-top10-rows"></div>
      `;
      vp3d.appendChild(lb);
    }

    // Chèn Bảng Quy Đổi Điểm (10đ, 9đ, 8đ, 7đ) vào Modal Chiến Thắng
    const vicModal = document.getElementById('victory-modal');
    if (vicModal && !document.getElementById('speed-final-podium-box')) {
      const pBox = document.createElement('div');
      pBox.id = 'speed-final-podium-box';
      const subTxt = document.getElementById('win-sub-txt');
      if (subTxt && subTxt.nextSibling) {
        vicModal.insertBefore(pBox, subTxt.nextSibling);
      } else {
        vicModal.appendChild(pBox);
      }
    }

    // Chèn 2 Nút Cứu Trợ vào Thanh điều khiển
    const controlsRow = document.querySelector('.host-controls-row');
    if (controlsRow && !document.getElementById('updat-rescue-box')) {
      const group = document.createElement('div');
      group.id = 'updat-rescue-box';
      group.className = 'rescue-btn-group';
      group.innerHTML = `
        <button class="btn-rescue-batch" id="btn-rescue-last" onclick="rescueLastEliminatedBatch()">
          🛟 Cứu Trợ Lượt Vừa Rồi
        </button>
        <button class="btn-rescue-random5" id="btn-rescue-rand5" onclick="rescueRandomFivePlayers()">
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
  }

  // 5. HOOK VÀO CÁC HÀM ĐIỀU KHIỂN TRẬN ĐẤU ĐỂ VẬN HÀNH CHẾ ĐỘ "AI NHANH NHẤT" & CỨU TRỢ
  window.lastEliminatedBatchIds = [];
  window.eliminatedHistoryByQ = {};

  function hookCoreGameFunctions() {
    // Hook update3DSceneByGameType để SPEED dùng chung sân khấu trí tuệ với BELL
    const origUpdate3DScene = window.update3DSceneByGameType;
    window.update3DSceneByGameType = function() {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        if (typeof ropeMesh !== 'undefined' && ropeMesh) ropeMesh.visible = false;
        if (typeof ribbonMesh !== 'undefined' && ribbonMesh) ribbonMesh.visible = false;
        if (typeof tugLinesGroup !== 'undefined' && tugLinesGroup) tugLinesGroup.visible = false;
        if (typeof goldenBellStageGroup !== 'undefined' && goldenBellStageGroup) goldenBellStageGroup.visible = true;
        renderLiveTop10Leaderboard();
        return;
      }
      if (typeof origUpdate3DScene === 'function') origUpdate3DScene();
      renderLiveTop10Leaderboard();
    };

    // Hook formatPlayerLabelText để hiện điểm tốc độ trên đầu nhân vật 3D
    const origFormatLabel = window.formatPlayerLabelText;
    window.formatPlayerLabelText = function(p, hasDoneQ) {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        return `${hasDoneQ ? '⚡ ' : ''}${p.label} [${p.speedScore || 0}đ]`;
      }
      return typeof origFormatLabel === 'function' ? origFormatLabel(p, hasDoneQ) : p.label;
    };

    // Hook rebuildAll3DCharacters & animate3DLoop cho chế độ SPEED
    const origRebuild3D = window.rebuildAll3DCharacters;
    window.rebuildAll3DCharacters = function() {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        const savedType = matchState.gameType;
        matchState.gameType = 'BELL';
        if (typeof origRebuild3D === 'function') origRebuild3D();
        matchState.gameType = savedType;
        if (typeof update3DLabelsStatusOnly === 'function') update3DLabelsStatusOnly();
        renderLiveTop10Leaderboard();
        return;
      }
      if (typeof origRebuild3D === 'function') origRebuild3D();
    };

    // Hook updateHostHUD cho chế độ SPEED
    const origUpdateHUD = window.updateHostHUD;
    window.updateHostHUD = function() {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
        const sorted = getSortedSpeedContestants();
        const leaderTxt = sorted.length > 0 ? `${sorted[0].label} (${sorted[0].speedScore || 0}đ)` : 'Chưa có';

        const leftBox = document.getElementById('hud-left-box');
        const rightBox = document.getElementById('hud-right-box');
        if (leftBox) leftBox.className = 'team-box gold-bell';
        if (rightBox) rightBox.className = 'team-box blue';

        document.getElementById('hud-red-count').innerText = `⚡ THÍ SINH ĐUA TỐC ĐỘ: ${allP.length} HS`;
        document.getElementById('hud-red-rounds').innerText = `20 giây / câu`;
        document.getElementById('hud-blue-count').innerText = `🥇 DẪN ĐẦU: ${leaderTxt}`;
        document.getElementById('hud-blue-rounds').innerText = `Top 1-3: 10đ | 4-6: 9đ | 7-10: 8đ`;

        document.getElementById('hud-round-title').innerText =
          `⚡ ĐẤU TRƯỜNG AI NHANH NHẤT • TRẢ LỜI ĐÚNG & NHANH NHẤT TRỌN 1000 ĐIỂM/CÂU!`;
        document.getElementById('hud-rope-score').innerText =
          `Mã Phòng: ${window.activeRoomId || '----'} | Câu số: ${matchState.globalQIndex + 1}/${quizList.length}`;
        renderLiveTop10Leaderboard();
        return;
      }
      if (typeof origUpdateHUD === 'function') origUpdateHUD();
      renderLiveTop10Leaderboard();
    };

    // Hook startMatch, forceAdvanceGlobalQuestion, stepHostQuestion để chạy đồng hồ 20 giây
    const origStartMatch = window.startMatch;
    window.startMatch = function() {
      if (typeof origStartMatch === 'function') origStartMatch();
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        startSpeed20sCountdown();
        renderLiveTop10Leaderboard();
      }
    };

    const origForceAdvance = window.forceAdvanceGlobalQuestion;
    window.forceAdvanceGlobalQuestion = function() {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        advanceNextSpeedQuestionOrEnd();
        return;
      }
      if (typeof origForceAdvance === 'function') origForceAdvance();
    };

    // Hook finishMatch để hiển thị Bảng Quy Đổi Điểm Hạng 1-15
    const origFinishMatch = window.finishMatch;
    window.finishMatch = function(winner) {
      stopSpeed20sCountdown();
      const wrap = document.getElementById('speed-timer-wrap');
      if (wrap) wrap.style.display = 'none';
      if (typeof origFinishMatch === 'function') origFinishMatch(winner);
      renderFinalSpeedGradingModal();
    };

    // Hook downloadCSVReport để xuất cột Điểm Quy Đổi (10đ, 9đ, 8đ, 7đ)
    const origDownloadCSV = window.downloadCSVReport;
    window.downloadCSVReport = function() {
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        let csv = "Hạng,Họ và Tên Học Sinh,Điểm Tốc Độ,Số câu đúng,Số câu sai,Điểm Quy Đổi Học Tập\n";
        const sorted = getSortedSpeedContestants();
        sorted.forEach((p, idx) => {
          const rank = idx + 1;
          const gInfo = getConvertedGradeByRank(rank);
          csv += `Hạng ${rank},"${p.label}",${p.speedScore || 0},${p.correct || 0},${p.freeze || 0},"${gInfo.grade} điểm"\n`;
        });
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `bang_diem_ai_nhanh_nhat_thpt_mang_thit.csv`;
        a.click();
        return;
      }
      if (typeof origDownloadCSV === 'function') origDownloadCSV();
    };

    // Hook handleHostIncomingData để tính điểm theo tốc độ (20 giây) và lưu vết Cứu Trợ
    const origHandleHostIncoming = window.handleHostIncomingData;
    window.handleHostIncomingData = function(d) {
      if (!d || !d.type) return;

      // Xử lý riêng chế độ SPEED (Ai Nhanh Nhất)
      if (typeof matchState !== 'undefined' && matchState.gameType === 'SPEED') {
        if (d.type === 'PULL_CORRECT') {
          const pObj = window.registerOrGetPlayer(d.playerId, d.team, d.playerName, true);
          if (matchState.status !== 'PLAYING') return;
          if (matchState.redAnsweredIds.includes(pObj.id) || matchState.blueAnsweredIds.includes(pObj.id)) return;

          if (typeof AudioFX !== 'undefined') AudioFX.pullHeave();
          pObj.correct = (pObj.correct || 0) + 1;

          // Tính điểm theo thời gian phản xạ trong 20 giây: Nhanh nhất 1000 điểm, giảm dần đến 100 điểm
          const elapsedMs = Math.max(0, Date.now() - (speedQuestionStartTime || Date.now()));
          const remainRatio = Math.max(0, (SPEED_DURATION_MS - elapsedMs) / SPEED_DURATION_MS);
          const gainedPts = elapsedMs <= 1200 ? 1000 : Math.max(100, Math.round(1000 * remainRatio));
          pObj.speedScore = (pObj.speedScore || 0) + gainedPts;

          const qItem = quizList[matchState.globalQIndex % quizList.length];
          if (qItem) qItem.rightCount = (qItem.rightCount || 0) + 1;

          matchState.redAnsweredIds.push(pObj.id);

          // Báo điểm vừa nhận về điện thoại học sinh
          sendCloudMessage({
            type: 'SPEED_POINT_RESULT',
            playerId: pObj.id,
            gainedPts: gainedPts,
            totalSpeedScore: pObj.speedScore
          });

          const totalPlayers = matchState.redPlayers.length + matchState.bluePlayers.length;
          if (totalPlayers > 0 && matchState.redAnsweredIds.length >= totalPlayers) {
            advanceNextSpeedQuestionOrEnd();
          } else {
            update3DLabelsStatusOnly();
            updateHostHUD();
            renderHostQuestionShowcase();
            broadcastTeamSyncState();
          }
          return;
        }
        else if (d.type === 'FREEZE_WRONG') {
          // Trong chế độ Ai Nhanh Nhất: Trả lời sai được 0 điểm câu đó và chờ mở câu tiếp theo
          const pObj = window.registerOrGetPlayer(d.playerId, d.team, d.playerName, true);
          if (matchState.status !== 'PLAYING') return;
          if (matchState.redAnsweredIds.includes(pObj.id)) return;

          if (typeof AudioFX !== 'undefined') AudioFX.freezeCrack();
          pObj.freeze = (pObj.freeze || 0) + 1;
          pObj.speedScore = pObj.speedScore || 0; // Cộng 0 điểm

          const qItem = quizList[matchState.globalQIndex % quizList.length];
          if (qItem) qItem.wrongCount = (qItem.wrongCount || 0) + 1;

          matchState.redAnsweredIds.push(pObj.id);

          sendCloudMessage({
            type: 'SPEED_POINT_RESULT',
            playerId: pObj.id,
            gainedPts: 0,
            totalSpeedScore: pObj.speedScore
          });

          const totalPlayers = matchState.redPlayers.length + matchState.bluePlayers.length;
          if (totalPlayers > 0 && matchState.redAnsweredIds.length >= totalPlayers) {
            advanceNextSpeedQuestionOrEnd();
          } else {
            update3DLabelsStatusOnly();
            updateHostHUD();
            renderHostQuestionShowcase();
            broadcastTeamSyncState();
          }
          return;
        }
        else if (d.type === 'FREEZE_DONE_NEXT') {
          return;
        }
      }

      // Lưu vết học sinh bị loại ở chế độ Rung Chuông Vàng để phục vụ Cứu trợ
      let prevEliminatedMap = {};
      if (typeof matchState !== 'undefined') {
        [...matchState.redPlayers, ...matchState.bluePlayers].forEach(p => {
          prevEliminatedMap[p.id] = !!p.eliminated;
        });
      }

      if (typeof origHandleHostIncoming === 'function') origHandleHostIncoming(d);

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
      }
    };

    // Hook vào điện thoại Học sinh (Client) để hiển thị điểm tốc độ & nhận lệnh Cứu trợ
    const origHandleMobileIncoming = window.handleMobileIncomingData;
    window.handleMobileIncomingData = function(d) {
      if (typeof origHandleMobileIncoming === 'function') origHandleMobileIncoming(d);

      if (d && d.type === 'SPEED_POINT_RESULT' && d.playerId === window.myPlayerId) {
        const toast = document.getElementById('bonus-life-toast');
        if (toast) {
          toast.style.background = d.gainedPts > 0
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : 'linear-gradient(135deg, #ef4444, #b91c1c)';
          toast.innerHTML = d.gainedPts > 0
            ? `⚡ CHÍNH XÁC! +${d.gainedPts} ĐIỂM TỐC ĐỘ! (Tổng: ${d.totalSpeedScore} đ)`
            : `❌ TRẢ LỜI SAI! +0 ĐIỂM (Tổng: ${d.totalSpeedScore} đ)`;
          toast.style.display = 'block';
          setTimeout(() => { toast.style.display = 'none'; }, 2600);
        }
        const statEl = document.getElementById('m-rope-stat');
        if (statEl) statEl.innerText = `⚡ Tổng điểm: ${d.totalSpeedScore} đ`;
      }

      if (d && d.type === 'PLAYER_LIVES_SYNC' && d.playerId === window.myPlayerId && d.rescuedNow) {
        window.myEliminated = false;
        window.myLives = d.lives || 1;
        window.myStreak = 0;
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
  }

  // 6. CÁC HÀM CỨU TRỢ HỒI SINH THÍ SINH
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

  function bootAllEnhancements() {
    injectSpeedModeUIAndHooks();
    hookCoreGameFunctions();
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', bootAllEnhancements);
  } else {
    bootAllEnhancements();
  }
})();
