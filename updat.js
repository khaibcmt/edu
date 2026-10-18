/* =========================================================================
   FILE NÂNG CẤP ĐỘC LẬP: updat.js
   Tác giả: Thầy Hồ Tấn Khải – Trường THPT Mang Thít
   Tính năng bổ sung:
   1. Chuyển thanh thông tin & điều hướng câu hỏi xuống cuối trang màn hình.
   2. Nút Cứu Trợ 1: Hồi sinh toàn bộ thí sinh vừa bị loại ở lượt gần nhất (do câu quá khó).
   3. Nút Cứu Trợ 2: Chọn ngẫu nhiên 5 học sinh đã bị loại để hồi sinh trở lại sàn đấu.
   ========================================================================= */

(function initUpdatModule() {
  // 1. Tinh chỉnh CSS: Đưa thanh trạng thái câu hỏi (.hq-header) xuống đáy cùng của trang màn hình
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    /* Đẩy câu hỏi và 4 đáp án lên trên, đưa thanh điều hướng xuống sát đáy màn hình */
    #host-question-board {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      padding: 10px 18px 6px 18px !important;
    }
    #host-question-board .hq-title {
      order: 1 !important;
      margin-bottom: 6px !important;
    }
    #host-question-board .hq-opts {
      order: 2 !important;
    }
    #host-question-board .hq-header {
      order: 3 !important;
      margin-top: 6px !important;
      margin-bottom: 0 !important;
      padding: 6px 14px !important;
      background: linear-gradient(90deg, #060913 0%, #172554 50%, #060913 100%) !important;
      border-top: 2px solid #38bdf8 !important;
      border-radius: 12px !important;
      box-shadow: 0 -4px 15px rgba(0,0,0,0.45) !important;
    }

    /* Cụm nút Cứu Trợ Rung Chuông Vàng nổi bật */
    .rescue-btn-group {
      display: inline-flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
    }
    .btn-rescue-batch {
      background: linear-gradient(135deg, #10b981, #047857) !important;
      color: #ffffff !important;
      border: 1.5px solid #6ee7b7 !important;
      padding: 4px 11px !important;
      border-radius: 14px !important;
      font-size: 11.5px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      box-shadow: 0 3px 10px rgba(16, 185, 129, 0.4);
      transition: transform 0.15s !important;
    }
    .btn-rescue-random5 {
      background: linear-gradient(135deg, #f59e0b, #b45309) !important;
      color: #ffffff !important;
      border: 1.5px solid #fde047 !important;
      padding: 4px 11px !important;
      border-radius: 14px !important;
      font-size: 11.5px !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      box-shadow: 0 3px 10px rgba(245, 158, 11, 0.4);
      transition: transform 0.15s !important;
    }
    .btn-rescue-batch:hover, .btn-rescue-random5:hover {
      transform: scale(1.05) !important;
    }

    /* Banner thông báo Cứu trợ thành công trên màn hình chính */
    #rescue-Floating-Banner {
      position: fixed;
      top: 105px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #059669, #10b981);
      border: 3px solid #fef08a;
      color: #fff;
      padding: 12px 28px;
      border-radius: 30px;
      font-size: 18px;
      font-weight: 900;
      z-index: 550;
      display: none;
      box-shadow: 0 12px 35px rgba(0,0,0,0.65);
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

  // 2. Lưu vết danh sách các học sinh vừa bị loại ở từng lượt câu hỏi
  window.lastEliminatedBatchIds = [];
  window.eliminatedHistoryByQ = {};

  // Hook vào hàm handleHostIncomingData để ghi nhận những học sinh vừa bị loại ở lượt câu hiện tại
  const origHandleHostIncoming = window.handleHostIncomingData;
  if (typeof origHandleHostIncoming === 'function') {
    window.handleHostIncomingData = function(d) {
      // Kiểm tra trạng thái trước khi xử lý
      let prevEliminatedMap = {};
      if (typeof matchState !== 'undefined') {
        [...matchState.redPlayers, ...matchState.bluePlayers].forEach(p => {
          prevEliminatedMap[p.id] = !!p.eliminated;
        });
      }

      origHandleHostIncoming(d);

      // Kiểm tra xem sau khi xử lý có học sinh nào vừa mới bị loại ở câu hỏi này không
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

  // 3. Hàm thực thi Hồi sinh danh sách học sinh được chọn
  function revivePlayersByIdList(idList, announcementTitle) {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const revivedNames = [];

    allP.forEach(p => {
      if (idList.includes(p.id) && p.eliminated) {
        p.eliminated = false;
        p.lives = Math.max(1, p.lives || 1); // Cấp lại 1 mạng (❤️) để tiếp tục thi đấu
        p.streak = 0;
        revivedNames.push(p.label);

        // Đồng bộ ngay về điện thoại của học sinh đó để mở lại màn hình câu hỏi
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

    // Nếu trận đấu vừa tự động kết thúc do bị loại hết ở câu khó, mở lại trạng thái PLAYING ngay!
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

  // CHẾ ĐỘ CỨU TRỢ 1: Hồi sinh các thí sinh vừa bị loại ở lượt gần nhất (do câu hỏi quá khó)
  window.rescueLastEliminatedBatch = function() {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const currentlyEliminated = allP.filter(x => x.eliminated);

    if (currentlyEliminated.length === 0) {
      return alert("Hiện tại tất cả thí sinh đều đang còn trên sàn đấu, chưa có ai bị loại!");
    }

    // Ưu tiên lấy nhóm vừa bị loại ở câu hiện tại hoặc câu liền trước; nếu không có thì hồi sinh toàn bộ học sinh đang bị loại
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

    // Lọc những em thực sự đang bị loại
    const validIds = targetIds.filter(id => currentlyEliminated.some(p => p.id === id));
    const finalIds = validIds.length > 0 ? validIds : currentlyEliminated.map(x => x.id);

    revivePlayersByIdList(finalIds, `🛟 CỨU TRỢ THÀNH CÔNG LƯỢT VỪA RỒI!`);
  };

  // CHẾ ĐỘ CỨU TRỢ 2: Chọn ngẫu nhiên 5 học sinh đã bị loại để hồi sinh trở lại sàn đấu
  window.rescueRandomFivePlayers = function() {
    if (typeof matchState === 'undefined') return;
    const allP = [...matchState.redPlayers, ...matchState.bluePlayers];
    const eliminatedPool = allP.filter(x => x.eliminated);

    if (eliminatedPool.length === 0) {
      return alert("Hiện tại chưa có thí sinh nào bị loại để bốc thăm hồi sinh!");
    }

    // Trộn ngẫu nhiên danh sách các học sinh đã bị loại và lấy tối đa 5 em
    const shuffled = [...eliminatedPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const picked5Ids = shuffled.slice(0, 5).map(x => x.id);

    revivePlayersByIdList(picked5Ids, `🎲 BỐC THĂM HỒI SINH NGẪU NHIÊN ${picked5Ids.length} THÍ SINH!`);
  };

  // 4. Gắn 2 nút Cứu Trợ vào Thanh điều khiển trên màn hình chính và dưới Bảng Câu Hỏi
  function injectRescueButtonsUI() {
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
      // Chèn ngay sau nút Qua Câu Mới
      const nextQBtn = controlsRow.querySelector('button[onclick*="forceAdvanceGlobalQuestion"]');
      if (nextQBtn && nextQBtn.nextSibling) {
        controlsRow.insertBefore(group, nextQBtn.nextSibling);
      } else {
        controlsRow.appendChild(group);
      }
    }

    // Thêm cả nút Cứu Trợ vào Modal Kết Thúc phòng khi cả lớp bị loại hết cùng lúc ở 1 câu quá khó
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

  // 5. Hook vào điện thoại Học sinh (Client) để khi được Thầy bấm Cứu Trợ là màn hình tự mở khóa câu hỏi ngay
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

  // Khởi chạy ngay khi tải xong DOM
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', injectRescueButtonsUI);
  } else {
    injectRescueButtonsUI();
  }
})();
