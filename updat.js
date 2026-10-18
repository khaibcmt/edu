/* =========================================================================
   FILE NÂNG CẤP GIAO DIỆN 3D & TÍNH NĂNG CỨU TRỢ ĐỘC LẬP: updat.js
   Tác giả: Thầy Hồ Tấn Khải – Trường THPT Mang Thít
   Tính năng:
   1. Tên trò chơi chữ nổi 3D kim loại vàng + Hiệu ứng ánh sáng quét ngang.
   2. Hình nền Cực Quang đa sắc chuyển động (Animated Aurora Mesh) bắt mắt.
   3. Thanh công cụ & toàn bộ nút bấm tạo khối 3D nổi (Tactile 3D Buttons).
   4. Khắc phục icon ô vuông trên Windows + Đưa thanh câu hỏi xuống cuối trang.
   5. Nút Cứu Trợ Lượt Vừa Rồi & Hồi Sinh Ngẫu Nhiên 5 HS.
   ========================================================================= */

(function initUpdat3DEdition() {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    /* =====================================================================
       1. HIỆU ỨNG TÊN TRÒ CHƠI 3D NỔI & THANH TOP BANNER HOÀNG GIA
       ===================================================================== */
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

    /* Tên trò chơi chữ nổi 3D nhiều lớp + Ánh kim chạy lấp lánh */
    .brand-title {
      font-size: 18px !important;
      font-weight: 900 !important;
      letter-spacing: 0.8px !important;
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

    /* Huy hiệu Tác giả & Trường dạng viên ngọc 3D */
    .author-badge {
      background: linear-gradient(180deg, #fef08a 0%, #f59e0b 100%) !important;
      color: #0f172a !important;
      border: 1.5px solid #ffffff !important;
      border-bottom: 4px solid #b45309 !important;
      padding: 4px 13px !important;
      border-radius: 20px !important;
      font-size: 12.5px !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.8) !important;
      transition: transform 0.15s !important;
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
      transition: all 0.12s !important;
    }
    .btn-fullscreen-top:active {
      transform: translateY(3px) !important;
      border-bottom-width: 1px !important;
    }

    /* =====================================================================
       2. HÌNH NỀN ĐA SẮC BẮT MẮT & KHUNG CÀI ĐẶT 3D NỔI
       ===================================================================== */
    #teacher-view {
      top: 50px !important;
      background: linear-gradient(-45deg, #1e1b4b, #0f172a, #0369a1, #4c1d95, #065f46, #7c2d12) !important;
      background-size: 400% 400% !important;
      animation: bgAuroraFlow 14s ease infinite !important;
      padding: 18px !important;
    }

    .setup-box {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.97) 0%, rgba(241, 245, 249, 0.96) 100%) !important;
      border: 3px solid #ffffff !important;
      border-bottom: 8px solid #cbd5e1 !important;
      border-radius: 26px !important;
      box-shadow: 0 22px 55px rgba(0, 0, 0, 0.55), 0 0 30px rgba(56, 189, 248, 0.35), inset 0 2px 5px #ffffff !important;
      padding: 20px 26px !important;
    }

    /* Tiêu đề trang cài đặt 3D */
    .setup-box h2 {
      font-size: 21px !important;
      font-weight: 900 !important;
      background: linear-gradient(90deg, #1e1b4b, #0284c7, #7c3aed) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      filter: drop-shadow(0 2px 1px rgba(0,0,0,0.12)) !important;
    }

    /* =====================================================================
       3. CÁC THANH CÔNG CỤ & NÚT BẤM DẠNG PHÍM CƠ 3D (TACTILE 3D BUTTONS)
       ===================================================================== */
    /* Khung chọn 2 Chế độ chơi 3D nổi */
    .gm-card {
      border-radius: 18px !important;
      border: 2px solid #cbd5e1 !important;
      border-bottom: 6px solid #94a3b8 !important;
      background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%) !important;
      box-shadow: 0 8px 18px rgba(0,0,0,0.08), inset 0 2px 2px #ffffff !important;
      transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
      padding: 14px 18px !important;
    }
    .gm-card:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 14px 26px rgba(0,0,0,0.14), inset 0 2px 2px #ffffff !important;
    }
    .gm-card:active {
      transform: translateY(2px) !important;
      border-bottom-width: 3px !important;
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
    .gm-icon {
      font-size: 36px !important;
      filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2)) !important;
    }

    /* Thanh quản lý 12 môn học 3D */
    .subject-manager {
      background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%) !important;
      border: 2px solid #ffffff !important;
      border-bottom: 5px solid #cbd5e1 !important;
      border-radius: 18px !important;
      padding: 14px !important;
      box-shadow: inset 0 2px 4px rgba(255,255,255,0.9), 0 6px 15px rgba(0,0,0,0.06) !important;
    }

    /* Nút 12 Môn THPT dạng viên gạch 3D bóng bẩy */
    .btn-subj {
      border-radius: 12px !important;
      border: 1.5px solid rgba(255,255,255,0.5) !important;
      border-bottom: 5px solid rgba(0, 0, 0, 0.38) !important;
      padding: 8px 13px !important;
      font-size: 12.5px !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.18), inset 0 2px 2px rgba(255,255,255,0.45) !important;
      transition: all 0.14s ease !important;
    }
    .btn-subj:hover {
      transform: translateY(-3px) !important;
      filter: brightness(1.08) !important;
      box-shadow: 0 8px 16px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.6) !important;
    }
    .btn-subj:active {
      transform: translateY(2px) !important;
      border-bottom-width: 2px !important;
    }
    .btn-subj.active-subj {
      border: 2px solid #ffffff !important;
      border-bottom: 5px solid #0f172a !important;
      transform: translateY(-3px) scale(1.05) !important;
      box-shadow: 0 0 0 3px #f59e0b, 0 10px 20px rgba(0,0,0,0.3) !important;
    }

    /* Các nút chức năng nhỏ trên thanh công cụ (3D Push Buttons) */
    .btn-action-sm {
      border-radius: 11px !important;
      border: 1.5px solid #cbd5e1 !important;
      border-bottom: 4.5px solid #94a3b8 !important;
      padding: 7px 13px !important;
      font-weight: 900 !important;
      box-shadow: 0 4px 8px rgba(0,0,0,0.08), inset 0 2px 1px rgba(255,255,255,0.8) !important;
      transition: all 0.12s ease !important;
    }
    .btn-action-sm:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 12px rgba(0,0,0,0.15), inset 0 2px 2px #ffffff !important;
    }
    .btn-action-sm:active {
      transform: translateY(2px) !important;
      border-bottom-width: 1.5px !important;
    }

    /* Nút lớn Mở Sân Đấu 3D */
    .btn-launch {
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #1d4ed8 100%) !important;
      border: 2px solid #bae6fd !important;
      border-bottom: 6px solid #1e3a8a !important;
      border-radius: 16px !important;
      padding: 13px 30px !important;
      font-size: 16px !important;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5) !important;
      box-shadow: 0 10px 24px rgba(2, 132, 199, 0.45), inset 0 2px 3px rgba(255,255,255,0.65) !important;
      transition: all 0.15s ease !important;
    }
    .btn-launch:hover {
      transform: translateY(-3px) scale(1.02) !important;
      filter: brightness(1.08) !important;
      box-shadow: 0 14px 30px rgba(2, 132, 199, 0.6), inset 0 2px 4px rgba(255,255,255,0.8) !important;
    }
    .btn-launch:active {
      transform: translateY(3px) !important;
      border-bottom-width: 2px !important;
    }

    /* =====================================================================
       4. THANH CÔNG CỤ SÂN ĐẤU 3D & NÚT ĐIỀU KHIỂN TRẬN ĐẤU 3D
       ===================================================================== */
    #host-view {
      top: 50px !important;
    }
    #host-top-header {
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 60%, #060913 100%) !important;
      border-bottom: 3.5px solid #38bdf8 !important;
      box-shadow: 0 8px 25px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.2) !important;
      padding: 7px 14px !important;
    }

    .c-btn {
      border-radius: 14px !important;
      border: 1.5px solid rgba(255,255,255,0.4) !important;
      border-bottom: 4.5px solid rgba(0,0,0,0.5) !important;
      padding: 5px 13px !important;
      font-size: 12px !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4), inset 0 2px 2px rgba(255,255,255,0.35) !important;
      transition: all 0.12s ease !important;
    }
    .c-btn:hover {
      transform: translateY(-2px) !important;
      filter: brightness(1.1) !important;
    }
    .c-btn:active {
      transform: translateY(2px) !important;
      border-bottom-width: 1.5px !important;
    }

    /* Hộp điểm số 2 Đội dạng Khối 3D Căng Bóng */
    .team-box.red {
      background: linear-gradient(180deg, #f87171 0%, #ef4444 45%, #b91c1c 100%) !important;
      border: 2px solid #fecaca !important;
      border-bottom: 5px solid #7f1d1d !important;
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.45), inset 0 2px 3px rgba(255,255,255,0.5) !important;
    }
    .team-box.blue {
      background: linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0369a1 100%) !important;
      border: 2px solid #bae6fd !important;
      border-bottom: 5px solid #0c4a6e !important;
      box-shadow: 0 6px 16px rgba(2, 132, 199, 0.45), inset 0 2px 3px rgba(255,255,255,0.5) !important;
    }
    .team-box.gold-bell {
      background: linear-gradient(180deg, #fbbf24 0%, #d97706 50%, #92400e 100%) !important;
      border: 2px solid #fef08a !important;
      border-bottom: 5px solid #78350f !important;
      box-shadow: 0 6px 16px rgba(245, 158, 11, 0.45), inset 0 2px 3px rgba(255,255,255,0.5) !important;
    }
    .center-round-hud {
      background: linear-gradient(180deg, #1e1b4b 0%, #090d16 100%) !important;
      border: 2px solid #fde047 !important;
      border-bottom: 5px solid #b45309 !important;
      box-shadow: 0 6px 18px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.2) !important;
    }

    /* =====================================================================
       5. KHUNG CÂU HỎI & 4 ĐÁP ÁN 3D + THANH ĐIỀU HƯỚNG Ở ĐÁY MÀN HÌNH
       ===================================================================== */
    #host-question-board {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      padding: 10px 18px 6px 18px !important;
      background: linear-gradient(180deg, #0f172a 0%, #060913 100%) !important;
      border-top: 4px solid #38bdf8 !important;
      box-shadow: 0 -12px 35px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.15) !important;
    }
    #host-question-board .hq-title {
      order: 1 !important;
      margin-bottom: 6px !important;
      background: linear-gradient(180deg, #312e81 0%, #1e1b4b 100%) !important;
      border: 2.5px solid #a5b4fc !important;
      border-bottom: 6px solid #0f0728 !important;
      border-radius: 16px !important;
      box-shadow: 0 6px 18px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.25) !important;
    }
    #host-question-board .hq-opts {
      order: 2 !important;
    }
    /* 4 Ô đáp án tạo khối 3D nổi rực rỡ */
    .hq-opt-item, .btn-ans {
      border-radius: 15px !important;
      border-top: 2px solid rgba(255,255,255,0.65) !important;
      border-left: 2px solid rgba(255,255,255,0.4) !important;
      border-right: 2px solid rgba(255,255,255,0.4) !important;
      border-bottom: 6px solid rgba(0,0,0,0.45) !important;
      box-shadow: 0 6px 15px rgba(0,0,0,0.45), inset 0 2px 3px rgba(255,255,255,0.35) !important;
    }

    /* Thanh thông tin câu hỏi cố định ở cuối trang màn hình theo dạng thanh 3D */
    #host-question-board .hq-header {
      order: 3 !important;
      margin-top: 6px !important;
      margin-bottom: 0 !important;
      padding: 6px 16px !important;
      background: linear-gradient(180deg, #1e293b 0%, #090d16 100%) !important;
      border: 1.5px solid #38bdf8 !important;
      border-bottom: 4px solid #0369a1 !important;
      border-radius: 14px !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.25) !important;
    }

    .hq-nav-btn {
      border-radius: 9px !important;
      border: 1.5px solid #94a3b8 !important;
      border-bottom: 3.5px solid #0f172a !important;
      box-shadow: 0 3px 6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3) !important;
      transition: all 0.12s !important;
    }
    .hq-nav-btn:active {
      transform: translateY(2px) !important;
      border-bottom-width: 1px !important;
    }

    /* Cụm nút Cứu Trợ 3D */
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
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(16, 185, 129, 0.45), inset 0 2px 2px rgba(255,255,255,0.4) !important;
      transition: all 0.12s !important;
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
      text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;
      box-shadow: 0 4px 10px rgba(245, 158, 11, 0.45), inset 0 2px 2px rgba(255,255,255,0.4) !important;
      transition: all 0.12s !important;
    }
    .btn-rescue-batch:hover, .btn-rescue-random5:hover {
      transform: translateY(-2px) !important;
      filter: brightness(1.08) !important;
    }
    .btn-rescue-batch:active, .btn-rescue-random5:active {
      transform: translateY(2px) !important;
      border-bottom-width: 1.5px !important;
    }

    /* Banner thông báo Cứu trợ thành công */
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
      font-size: 18px;
      font-weight: 900;
      z-index: 550;
      display: none;
      box-shadow: 0 15px 40px rgba(0,0,0,0.75);
      text-align: center;
    }
  `;
  document.head.appendChild(styleEl);

  // Tạo Banner thông báo cứu trợ trên màn hình
  const rescueBanner = document.createElement('div');
  rescueBanner.id = 'rescue-Floating-Banner';
  document.body.appendChild(rescueBanner);

  function showRescueBanner(msg) {
    rescueBanner.innerHTML = msg;
    rescueBanner.style.display = 'block';
    if (typeof confetti === 'function') {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.45 } });
    }
    if (typeof AudioFX !== 'undefined' && AudioFX.bonusLifeChime) {
      AudioFX.bonusLifeChime();
    }
    setTimeout(() => {
      rescueBanner.style.display = 'none';
    }, 4000);
  }

  // Khắc phục biểu tượng 🪢 ở thẻ Chế độ 1 bị lỗi hiển thị thành ô vuông [] trên Windows
  function fixTugIconDisplay() {
    const tugCardIcon = document.querySelector('#gm-card-TUG .gm-icon');
    if (tugCardIcon) {
      tugCardIcon.innerHTML = '⚔️';
    }
  }

  // Lưu vết danh sách các học sinh vừa bị loại ở từng lượt câu hỏi
  window.lastEliminatedBatchIds = [];
  window.eliminatedHistoryByQ = {};

  const origHandleHostIncoming = window.handleHostIncomingData;
  if (typeof origHandleHostIncoming === 'function') {
    window.handleHostIncomingData = function(d) {
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
  }

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

  // CHẾ ĐỘ CỨU TRỢ 1: Hồi sinh các thí sinh vừa bị loại ở lượt gần nhất
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

  // CHẾ ĐỘ CỨU TRỢ 2: Chọn ngẫu nhiên 5 học sinh đã bị loại để hồi sinh
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
    fixTugIconDisplay();

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
      const btnContainer = vicModal.querySelector('div');
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
    const btnRand = document.getElementById('btn-rescue-rand5');
    if (btnLast) {
      btnLast.innerHTML = outCount > 0
        ? `🛟 Cứu Trợ Lượt Vừa Rồi (${outCount} HS bị loại)`
        : `🛟 Cứu Trợ Lượt Vừa Rồi`;
    }
    if (btnRand) {
      btnRand.innerHTML = `🎲 Hồi Sinh Ngẫu Nhiên 5 HS`;
    }
  }

  const origHandleMobileIncoming = window.handleMobileIncomingData;
  if (typeof origHandleMobileIncoming === 'function') {
    window.handleMobileIncomingData = function(d) {
      origHandleMobileIncoming(d);

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

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', injectRescueButtonsUI);
  } else {
    injectRescueButtonsUI();
  }
})();
