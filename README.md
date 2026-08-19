<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CRM - Tapicentro</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    color-scheme: light;
    --paper: #EEF1E9;
    --paper-deep: #E5E9DC;
    --surface: #FBFCF8;
    --surface-raised: #FFFFFF;
    --line: #D7DCC8;
    --line-soft: #E4E7DC;
    --ink: #1E2318;
    --ink-soft: #565F49;
    --ink-muted: #878F76;
    --accent: #2F5233;
    --accent-strong: #1F3B24;
    --accent-wash: #E3EADB;
    --accent-contrast: #FBFCF8;
    --rust: #B5502B;
    --rust-wash: #F5E3DA;
    --good: #0ca30c;
    --good-wash: #DCEEDA;
    --critical: #d03b3b;
    --critical-wash: #F6DEDE;
    --stage-lead: #2a78d6;
    --stage-contactado: #1baf7a;
    --stage-propuesta: #b5860a;
    --stage-negociacion: #eb6834;
    --radius-s: 6px;
    --radius-m: 10px;
    --radius-l: 16px;
    --shadow-card: 0 1px 2px rgba(30,35,24,0.06), 0 1px 1px rgba(30,35,24,0.04);
    --shadow-pop: 0 12px 32px rgba(20,26,16,0.18), 0 2px 8px rgba(20,26,16,0.10);
    --font-display: "Fraunces", "Iowan Old Style", Georgia, serif;
    --font-sans: "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
    --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
  }

  *,*::before,*::after{ box-sizing: border-box; }
  html,body{ height:100%; }
  body{
    margin:0;
    font-family: var(--font-sans);
    background: var(--paper);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }
  h1,h2,h3{ font-family: var(--font-display); font-weight:500; margin:0; letter-spacing:-0.01em; }
  button, input, select, textarea{ font-family: inherit; font-size: inherit; color: inherit; }
  button{ cursor:pointer; }
  .mono{ font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
  a{ color: var(--accent); }

  :focus-visible{ outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 3px; }

  @media (prefers-reduced-motion: reduce){
    *{ animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
  }

  /* ---------- App shell ---------- */
  #app{
    display:grid;
    grid-template-columns: 236px 1fr;
    min-height:100vh;
  }
  .sidebar{
    background: var(--paper-deep);
    border-right: 1px solid var(--line);
    display:flex;
    flex-direction:column;
    padding: 22px 16px;
    position: sticky;
    top:0;
    height:100vh;
  }
  .brand{
    display:flex; align-items:baseline; gap:8px;
    padding: 4px 8px 20px 8px;
  }
  .brand-mark{
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--accent-strong);
  }
  .brand-sub{
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }
  .nav-section-label{
    font-size: 10.5px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-muted);
    padding: 4px 10px 8px;
  }
  nav.tabs{ display:flex; flex-direction:column; gap:2px; }
  .tab-btn{
    display:flex; align-items:center; gap:10px;
    background: transparent;
    border: none;
    text-align:left;
    padding: 9px 10px;
    border-radius: var(--radius-s);
    color: var(--ink-soft);
    font-size: 14px;
    font-weight: 500;
    position: relative;
  }
  .tab-btn .dot{
    width:7px; height:7px; border-radius:50%;
    background: var(--line);
    flex-shrink:0;
  }
  .tab-btn:hover{ background: rgba(47,82,51,0.08); color: var(--ink); }
  .tab-btn.active{ background: var(--accent); color: var(--accent-contrast); }
  .tab-btn.active .dot{ background: var(--accent-contrast); }
  .tab-btn .count{
    margin-left:auto;
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: inherit;
    opacity: 0.75;
  }

  .sidebar-spacer{ flex:1; }
  .sidebar-footer{
    border-top: 1px solid var(--line);
    padding-top: 14px;
    display:flex;
    flex-direction:column;
    gap: 6px;
  }
  .ghost-link-btn{
    background:none; border:none; text-align:left;
    font-size: 12.5px; color: var(--ink-soft);
    padding: 6px 8px; border-radius: var(--radius-s);
    display:flex; align-items:center; gap:7px;
  }
  .ghost-link-btn:hover{ background: rgba(47,82,51,0.08); color: var(--accent-strong); }

  main{ min-width:0; padding: 26px 34px 60px; }

  .view-header{
    display:flex; align-items:flex-end; justify-content:space-between;
    gap: 20px; margin-bottom: 22px; flex-wrap:wrap;
  }
  .view-header h1{ font-size: 27px; }
  .view-header .view-desc{ color: var(--ink-soft); font-size: 13.5px; margin-top:4px; max-width: 46ch; }
  .header-actions{ display:flex; gap:10px; align-items:center; flex-wrap: wrap; }

  .search-input{
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-s);
    padding: 8px 12px;
    font-size: 13.5px;
    min-width: 220px;
  }
  .search-input:focus{ border-color: var(--accent); }

  .filter-bar{
    display:flex; gap:10px; align-items:center; flex-wrap:wrap;
    margin: -8px 0 16px;
  }
  .filter-bar select.search-input{ min-width: 170px; }

  .form-section-label{
    font-size: 11px; text-transform:uppercase; letter-spacing:0.07em;
    color: var(--ink-muted); font-weight:700;
    margin: 6px 0 -6px;
  }
  .occurs-box{
    display:flex; align-items:center; gap:8px;
    background: var(--accent-wash); border: 1px solid var(--accent);
    color: var(--accent-strong); font-weight:700; font-size:12.5px;
    padding: 9px 12px; border-radius: var(--radius-s);
    margin: 4px 0 2px;
  }
  .field input:disabled, .field select:disabled{
    background: var(--line-soft); color: var(--ink-muted); cursor: not-allowed;
  }

  .contact-picker{ position:relative; }
  .contact-picker .search-icon{
    position:absolute; left:11px; top:50%; transform:translateY(-50%);
    font-size:13px; opacity:0.55; pointer-events:none;
  }
  .contact-picker input#p-contact-search{
    padding-left: 32px; padding-right: 30px;
  }
  .contact-picker-clear{
    position:absolute; right:6px; top:50%; transform:translateY(-50%);
    border:none; background:transparent; color:var(--ink-muted);
    font-size:15px; line-height:1; cursor:pointer; padding:4px 6px;
    border-radius: 50%;
  }
  .contact-picker-clear:hover{ background: var(--line-soft); color:var(--ink); }
  .contact-picker-list{
    position:absolute; z-index: 40; top: calc(100% + 4px); left:0; right:0;
    background: var(--surface); border:1px solid var(--line);
    border-radius: var(--radius-s); box-shadow: 0 8px 20px rgba(0,0,0,0.14);
    max-height: 220px; overflow-y:auto; padding:4px;
  }
  .contact-picker-list[hidden]{ display:none; }
  .contact-picker-item{
    padding: 7px 10px; border-radius: 6px; font-size: 13.5px; cursor:pointer;
  }
  .contact-picker-item:hover, .contact-picker-item.active{ background: var(--accent-wash); }
  .contact-picker-empty{
    padding: 8px 10px; font-size: 12.5px; color: var(--ink-muted);
  }

  .calendar-toolbar{
    display:flex; align-items:center; justify-content:center; gap:18px;
    margin: -6px 0 16px;
  }
  .calendar-nav{ display:flex; align-items:center; gap:8px; }
  .calendar-month-label{
    font-family: var(--font-display); font-size: 19px; font-weight:500;
    min-width: 190px; text-align:center;
  }
  .calendar-grid{
    display:grid; grid-template-columns: repeat(7, 1fr);
    gap:1px; background: var(--line); border:1px solid var(--line);
    border-radius: var(--radius-m); overflow:hidden;
  }
  .calendar-weekday{
    background: var(--paper-deep); padding:8px 10px;
    font-size:11px; text-transform:uppercase; letter-spacing:0.06em;
    color:var(--ink-muted); font-weight:700; text-align:center;
  }
  .calendar-cell{
    background: var(--surface); min-height: 104px;
    padding:6px; display:flex; flex-direction:column; gap:4px;
  }
  .calendar-cell.outside{ background: var(--paper); }
  .calendar-cell.today{ background: var(--accent-wash); }
  .calendar-daynum{ font-family: var(--font-mono); font-size:12px; color:var(--ink-muted); }
  .calendar-cell.today .calendar-daynum{ color: var(--accent-strong); font-weight:700; }
  .calendar-cell.outside .calendar-daynum{ color: var(--line); }
  .calendar-task-chip{
    font-size:11.5px; padding:3px 6px; border-radius:5px;
    background: var(--accent-wash); color: var(--accent-strong);
    cursor:pointer; overflow:hidden; text-overflow:ellipsis;
    white-space:nowrap; border:1px solid transparent;
  }
  .calendar-task-chip:hover{ border-color: var(--accent); }
  .calendar-task-chip.overdue{ background: var(--rust-wash); color: var(--rust); }
  .calendar-task-chip.done{ background: var(--line-soft); color: var(--ink-muted); text-decoration: line-through; }
  .calendar-more{ font-size:11px; color:var(--ink-muted); padding:1px 6px; }
  @media (max-width: 720px){
    .calendar-cell{ min-height: 64px; }
    .calendar-weekday{ padding:6px 3px; font-size:9.5px; }
    .calendar-task-chip{ font-size:10px; padding:2px 4px; }
  }

  .btn{
    display:inline-flex; align-items:center; gap:7px;
    border-radius: var(--radius-s);
    padding: 8px 14px;
    font-size: 13.5px;
    font-weight: 600;
    border: 1px solid transparent;
    line-height:1.2;
  }
  .btn-primary{ background: var(--accent); color: var(--accent-contrast); }
  .btn-primary:hover{ background: var(--accent-strong); }
  .btn-secondary{ background: var(--surface); border-color: var(--line); color: var(--ink); }
  .btn-secondary:hover{ border-color: var(--ink-muted); }
  .btn-danger{ background: var(--surface); border-color: var(--rust); color: var(--rust); }
  .btn-danger:hover{ background: var(--rust-wash); }
  .btn-sm{ padding: 5px 10px; font-size: 12.5px; }

  section.view{ display:none; }
  section.view.active{ display:block; }

  /* ---------- Dashboard ---------- */
  .stat-grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 22px;
  }
  .stat-tile{
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-m);
    padding: 16px 18px;
    box-shadow: var(--shadow-card);
  }
  .stat-tile .stat-value{
    font-family: var(--font-mono);
    font-size: 28px;
    font-weight: 500;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
  }
  .stat-tile .stat-label{
    font-size: 12px; color: var(--ink-soft); margin-top: 3px;
  }

  .dash-grid{
    display:grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 16px;
    align-items:start;
  }
  .panel{
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-m);
    padding: 18px 20px;
    box-shadow: var(--shadow-card);
  }
  .panel h2{ font-size: 16px; margin-bottom: 4px; }
  .panel .panel-desc{ font-size: 12px; color: var(--ink-muted); margin-bottom: 14px; }

  .stage-bar-row{ display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .stage-bar-row .stage-name{ width: 100px; font-size: 12.5px; color: var(--ink-soft); flex-shrink:0; }
  .stage-bar-track{ flex:1; height:8px; background: var(--line-soft); border-radius:4px; overflow:hidden; }
  .stage-bar-fill{ height:100%; border-radius:4px; }
  .stage-bar-row .stage-count{ font-family: var(--font-mono); font-size:12px; color: var(--ink-muted); width: 20px; text-align:right; }

  .task-row{
    display:flex; align-items:center; gap:10px;
    padding: 9px 0;
    border-bottom: 1px solid var(--line-soft);
  }
  .task-row:last-child{ border-bottom:none; }
  .task-row .task-check{ width:16px; height:16px; accent-color: var(--accent); flex-shrink:0; }
  .task-row .task-title{ font-size: 13.5px; flex:1; }
  .task-row .task-due{ font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-muted); }
  .task-due.overdue{ color: var(--rust); font-weight:600; }

  /* ---------- Empty states ---------- */
  .empty-state{
    text-align:center;
    padding: 46px 24px;
    color: var(--ink-soft);
  }
  .empty-state h3{ font-size: 17px; color: var(--ink); margin-bottom: 6px; }
  .empty-state p{ font-size: 13px; max-width: 40ch; margin: 0 auto 16px; line-height:1.5; }
  .empty-state-mini{ text-align:center; padding: 26px 10px; color: var(--ink-muted); font-size:12.5px; }

  /* ---------- Tables ---------- */
  table.ledger{ width:100%; border-collapse: collapse; }
  table.ledger thead th{
    text-align:left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ink-muted);
    font-weight:600;
    padding: 0 12px 10px;
    border-bottom: 1px solid var(--line);
  }
  table.ledger tbody td{
    padding: 12px 12px;
    border-bottom: 1px solid var(--line-soft);
    font-size: 13.5px;
    vertical-align: middle;
  }
  table.ledger tbody tr:hover{ background: var(--accent-wash); cursor:pointer; }
  table.ledger tbody tr:last-child td{ border-bottom:none; }
  .cell-primary{ font-weight:600; }
  .cell-muted{ color: var(--ink-muted); }
  .row-actions{ display:flex; gap:6px; opacity:0; transition: opacity .12s; }
  table.ledger tbody tr:hover .row-actions{ opacity:1; }
  .icon-btn{
    background:none; border:1px solid var(--line); border-radius: var(--radius-s);
    width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center;
    color: var(--ink-soft);
  }
  .icon-btn:hover{ border-color: var(--ink-muted); color: var(--ink); background: var(--surface-raised); }

  .table-wrap{
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius-m);
    padding: 6px 8px;
    box-shadow: var(--shadow-card);
  }

  /* ---------- Pipeline / Kanban ---------- */
  .pipeline-board{
    display:grid;
    grid-auto-flow: column;
    grid-auto-columns: 236px;
    gap: 14px;
    overflow-x: auto;
    padding-bottom: 12px;
  }
  .stage-col{
    background: var(--paper-deep);
    border: 1px solid var(--line);
    border-radius: var(--radius-m);
    display:flex; flex-direction:column;
    min-height: 160px;
  }
  .stage-col.drag-over{ outline: 2px dashed var(--accent); outline-offset: -2px; }
  .stage-col-head{
    display:flex; align-items:center; gap:8px;
    padding: 12px 12px 10px;
    border-bottom: 1px solid var(--line);
  }
  .stage-tab{
    width:10px; height:10px; border-radius: 3px; flex-shrink:0;
  }
  .stage-col-head .stage-title{ font-size: 12.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.04em; }
  .stage-col-head .stage-count{ margin-left:auto; font-family: var(--font-mono); font-size:11.5px; color: var(--ink-muted); }
  .stage-col-body{ padding: 10px; display:flex; flex-direction:column; gap:9px; flex:1; }
  .deal-card{
    background: var(--surface-raised);
    border: 1px solid var(--line);
    border-left: 4px solid var(--stage-lead);
    border-radius: var(--radius-s);
    padding: 10px 11px;
    box-shadow: var(--shadow-card);
    cursor: grab;
  }
  .deal-card:active{ cursor: grabbing; }
  .deal-card .deal-title{ font-size: 13px; font-weight:600; margin-bottom: 3px; }
  .deal-card .deal-org{ font-size: 11.5px; color: var(--ink-soft); margin-bottom: 7px; }
  .deal-card .deal-value{ font-family: var(--font-mono); font-size: 13.5px; font-weight:600; color: var(--accent-strong); }
  .deal-card .deal-meta{ display:flex; justify-content:space-between; align-items:center; margin-top:7px; }
  .deal-card .deal-next{ font-size: 10.5px; color: var(--ink-muted); }
  .deal-card select.stage-move{
    font-size: 10.5px; border:1px solid var(--line); border-radius:4px; background:var(--surface);
    padding:2px 3px; color: var(--ink-soft);
  }
  .stage-col-add{
    margin: 0 10px 10px; background:none; border: 1px dashed var(--line);
    border-radius: var(--radius-s); padding: 7px; font-size: 12px; color: var(--ink-muted);
  }
  .stage-col-add:hover{ border-color: var(--accent); color: var(--accent); }

  /* ---------- Tasks ---------- */
  .task-groups{ display:flex; flex-direction:column; gap:20px; }
  .task-group h2{ font-size: 14px; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .task-group h2 .badge{
    font-family: var(--font-mono); font-size:11px; background: var(--line-soft);
    color: var(--ink-soft); padding:1px 7px; border-radius:20px;
  }
  .task-list{ background: var(--surface); border:1px solid var(--line); border-radius: var(--radius-m); box-shadow: var(--shadow-card); }
  .task-item{
    display:flex; align-items:flex-start; gap:12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--line-soft);
  }
  .task-item:last-child{ border-bottom:none; }
  .task-item input[type=checkbox]{ margin-top:2px; width:16px; height:16px; accent-color: var(--accent); flex-shrink:0; }
  .task-item .task-title{ font-size: 13.5px; font-weight:500; }
  .task-item.done .task-title{ text-decoration: line-through; color: var(--ink-muted); }
  .task-item .task-sub{ font-size: 11.5px; color: var(--ink-muted); margin-top:2px; }
  .task-item .task-due-badge{
    margin-left:auto; font-family: var(--font-mono); font-size: 11.5px;
    padding: 2px 8px; border-radius: 20px; background: var(--line-soft); color: var(--ink-soft);
    white-space: nowrap;
  }
  .task-due-badge.overdue{ background: var(--rust-wash); color: var(--rust); }
  .task-due-badge.today{ background: var(--accent-wash); color: var(--accent-strong); }

  .chip{
    display:inline-flex; align-items:center; gap:5px;
    font-size: 11px; padding: 2px 8px; border-radius: 20px;
    background: var(--line-soft); color: var(--ink-soft);
  }
  .stage-chip{ color: #fff; font-weight:600; }
  .payment-chip{
    background: var(--rust-wash); color: var(--rust); font-weight:700;
    margin-left: 7px; vertical-align: middle;
  }
  .status-chip-paid{
    background: var(--good-wash); color: var(--good); font-weight:700;
    margin-left: 7px; vertical-align: middle;
  }
  .wa-chip{
    background: #DCF3E6; color: #146c43; font-weight:700;
    margin-left: 6px; vertical-align: middle;
  }
  .wa-chip-alert{ background: var(--rust-wash); color: var(--rust); }
  .contact-check-list{
    max-height: 140px; overflow-y: auto;
    border: 1px solid var(--line); border-radius: var(--radius-s);
    padding: 4px 12px; background: var(--surface);
  }
  .contact-check-row{
    display:flex; align-items:center; gap:8px;
    font-size: 13px; padding: 6px 0;
    border-bottom: 1px solid var(--line-soft);
  }
  .contact-check-row:last-child{ border-bottom:none; }
  .contact-check-row input{ width:15px; height:15px; accent-color: var(--accent); }

  /* ---------- Task photo evidence ---------- */
  .task-photo-thumb{
    width: 34px; height: 34px; border-radius: var(--radius-s);
    background-size: cover; background-position: center;
    border: 1px solid var(--line); flex-shrink:0; padding:0;
  }
  .task-photo-thumb:hover{ border-color: var(--accent); }
  .photo-preview-wrap{
    display:flex; align-items:center; gap:10px; margin-top:6px;
  }
  .photo-preview-img{
    width: 64px; height: 64px; object-fit: cover;
    border-radius: var(--radius-s); border: 1px solid var(--line);
  }
  .field input[type=file]{
    border: 1px dashed var(--line); background: var(--surface);
    padding: 8px 10px; font-size: 12.5px; border-radius: var(--radius-s);
  }
  .lightbox-backdrop{
    position:fixed; inset:0; background: rgba(15,19,11,0.78);
    display:flex; align-items:center; justify-content:center;
    padding: 30px; z-index: 300;
  }
  .lightbox-backdrop[hidden]{ display:none; }
  .lightbox-backdrop img{
    max-width: min(88vw, 800px); max-height: 84vh;
    border-radius: var(--radius-m); box-shadow: var(--shadow-pop);
  }
  .lightbox-close{
    position:absolute; top:20px; right:24px;
    background: rgba(251,252,248,0.14); border: 1px solid rgba(251,252,248,0.4);
    color: #fff; width:34px; height:34px; border-radius:50%;
    font-size: 16px; display:flex; align-items:center; justify-content:center;
  }
  .btn-filter-toggle.active{ background: var(--accent); color: var(--accent-contrast); border-color: var(--accent); }

  /* ---------- Modal ---------- */
  .modal-backdrop{
    position:fixed; inset:0; background: rgba(20,26,16,0.38);
    display:flex; align-items:flex-start; justify-content:center;
    padding: 6vh 20px; overflow-y:auto;
    z-index: 100;
  }
  .modal-backdrop[hidden]{ display:none; }
  .modal{
    background: var(--surface-raised);
    border-radius: var(--radius-l);
    width: 100%; max-width: 480px;
    box-shadow: var(--shadow-pop);
    padding: 24px 26px 22px;
  }
  .modal h2{ font-size: 19px; margin-bottom: 4px; }
  .modal .modal-sub{ font-size: 12.5px; color: var(--ink-muted); margin-bottom: 18px; }
  .field{ margin-bottom: 14px; display:flex; flex-direction:column; gap:5px; }
  .field label{ font-size: 12px; font-weight:600; color: var(--ink-soft); }
  .field input, .field select, .field textarea{
    border:1px solid var(--line); border-radius: var(--radius-s);
    padding: 9px 11px; background: var(--surface); font-size: 13.5px;
  }
  .field input:focus, .field select:focus, .field textarea:focus{ border-color: var(--accent); }
  .field textarea{ resize: vertical; min-height: 60px; }
  .field-row{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
  .field-hint{ font-size:11px; color: var(--ink-muted); }
  .modal-actions{ display:flex; justify-content: space-between; align-items:center; margin-top: 18px; gap:10px; }
  .modal-actions .left{ display:flex; gap:8px; }
  .modal-actions .right{ display:flex; gap:8px; margin-left:auto; }

  /* ---------- Toast ---------- */
  #toast{
    position:fixed; bottom: 22px; left:50%; transform: translateX(-50%) translateY(8px);
    background: var(--ink); color: var(--paper);
    padding: 10px 18px; border-radius: 20px; font-size: 13px;
    box-shadow: var(--shadow-pop);
    opacity:0; pointer-events:none; transition: opacity .18s, transform .18s;
    z-index: 200;
  }
  #toast.show{ opacity:1; transform: translateX(-50%) translateY(0); }

  .hidden{ display:none !important; }

  @media (max-width: 880px){
    #app{ grid-template-columns: 1fr; }
    .sidebar{
      position:static; height:auto;
      display:flex; flex-direction:row; align-items:center;
      overflow-x:auto; -webkit-overflow-scrolling:touch;
      padding: 10px 12px; gap: 14px;
    }
    .brand{ padding: 0; flex-shrink:0; }
    .brand-sub{ display:none; }
    nav.tabs{ flex-direction:row; flex-shrink:0; }
    .tab-btn{ white-space:nowrap; }
    .sidebar-spacer{ display:none; }
    .nav-section-label{ display:none; }
    .sidebar-footer{
      flex-direction:row; flex-shrink:0;
      border-top:none; border-left: 1px solid var(--line);
      padding-top:0; padding-left:14px; margin:0;
    }
    .ghost-link-btn{ white-space:nowrap; }
    main{ padding: 18px 16px 50px; }
    .stat-grid{ grid-template-columns: 1fr 1fr; }
    .task-item{ flex-wrap: wrap; }
    .dash-grid{ grid-template-columns: 1fr; }
    .field-row{ grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<div id="app">
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-mark">CRM - Tapicentro</span>
    </div>
    <div class="brand-sub" style="padding:0 8px 18px;">tu registro de clientes</div>

    <div class="nav-section-label">Navegación</div>
    <nav class="tabs" id="main-nav">
      <button class="tab-btn active" data-view="dashboard"><span class="dot"></span>Panel</button>
      <button class="tab-btn" data-view="contacts"><span class="dot"></span>Contactos<span class="count" id="nav-count-contacts">0</span></button>
      <button class="tab-btn" data-view="companies"><span class="dot"></span>Empresas<span class="count" id="nav-count-companies">0</span></button>
      <button class="tab-btn" data-view="pipeline"><span class="dot"></span>Pipeline<span class="count" id="nav-count-pipeline">0</span></button>
      <button class="tab-btn" data-view="tasks"><span class="dot"></span>Tareas<span class="count" id="nav-count-tasks">0</span></button>
      <button class="tab-btn" data-view="calendar"><span class="dot"></span>Calendario</button>
      <button class="tab-btn" data-view="payments"><span class="dot"></span>Pagos pendientes<span class="count" id="nav-count-payments">0</span></button>
    </nav>

    <div class="sidebar-spacer"></div>

    <div class="sidebar-footer">
      <button class="ghost-link-btn" id="btn-export">⭳ Exportar datos</button>
      <button class="ghost-link-btn" id="btn-import">⭱ Importar datos</button>
      <input type="file" id="import-file-input" accept="application/json" class="hidden">
    </div>
  </aside>

  <main>

    <!-- DASHBOARD -->
    <section class="view active" id="view-dashboard">
      <div class="view-header">
        <div>
          <h1>Panel</h1>
          <div class="view-desc">Un vistazo a tus contactos, negocios y pendientes de hoy.</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-tile"><div class="stat-value mono" id="stat-contacts">0</div><div class="stat-label">contactos</div></div>
        <div class="stat-tile"><div class="stat-value mono" id="stat-open-deals">0</div><div class="stat-label">negocios abiertos</div></div>
        <div class="stat-tile"><div class="stat-value mono" id="stat-pipeline-value">$0</div><div class="stat-label">valor en pipeline</div></div>
        <div class="stat-tile"><div class="stat-value mono" id="stat-tasks-today">0</div><div class="stat-label">tareas para hoy</div></div>
        <div class="stat-tile"><div class="stat-value mono" id="stat-pending-payments">$0</div><div class="stat-label">pagos por cobrar</div></div>
      </div>

      <div class="dash-grid">
        <div class="panel">
          <h2>Etapas del pipeline</h2>
          <div class="panel-desc">Distribución de negocios abiertos por etapa.</div>
          <div id="stage-bars"></div>
        </div>
        <div class="panel">
          <h2>Tareas de hoy</h2>
          <div class="panel-desc">Lo que toca atender hoy.</div>
          <div id="dash-tasks-today"></div>
        </div>
      </div>
    </section>

    <!-- CONTACTS -->
    <section class="view" id="view-contacts">
      <div class="view-header">
        <div>
          <h1>Contactos</h1>
          <div class="view-desc">Las personas con las que hablas: clientes, prospectos y aliados.</div>
        </div>
        <div class="header-actions">
          <input class="search-input" id="search-contacts" placeholder="Buscar por nombre, empresa, ciudad…">
          <button class="btn btn-primary" id="btn-new-contact">+ Nuevo contacto</button>
        </div>
      </div>
      <div class="filter-bar">
        <select class="search-input" id="filter-contact-company"><option value="">Todas las empresas</option></select>
        <select class="search-input" id="filter-contact-city"><option value="">Todas las ciudades</option></select>
        <button class="btn btn-secondary btn-sm" id="btn-sort-contacts">Apellido ↑</button>
      </div>
      <div id="contacts-body"></div>
    </section>

    <!-- COMPANIES -->
    <section class="view" id="view-companies">
      <div class="view-header">
        <div>
          <h1>Empresas</h1>
          <div class="view-desc">Las organizaciones detrás de tus contactos y negocios.</div>
        </div>
        <div class="header-actions">
          <input class="search-input" id="search-companies" placeholder="Buscar empresa…">
          <button class="btn btn-primary" id="btn-new-company">+ Nueva empresa</button>
        </div>
      </div>
      <div id="companies-body"></div>
    </section>

    <!-- PIPELINE -->
    <section class="view" id="view-pipeline">
      <div class="view-header">
        <div>
          <h1>Pipeline</h1>
          <div class="view-desc">Arrastra una tarjeta para cambiarla de etapa, o usa el selector.</div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" id="btn-new-deal">+ Nuevo negocio</button>
        </div>
      </div>
      <div class="pipeline-board" id="pipeline-board"></div>
    </section>

    <!-- TASKS -->
    <section class="view" id="view-tasks">
      <div class="view-header">
        <div>
          <h1>Tareas</h1>
          <div class="view-desc">Tus próximos pasos con cada contacto o negocio.</div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" id="btn-new-task">+ Nueva tarea</button>
        </div>
      </div>
      <div class="task-groups" id="task-groups"></div>
    </section>

    <!-- CALENDAR -->
    <section class="view" id="view-calendar">
      <div class="view-header">
        <div>
          <h1>Calendario</h1>
          <div class="view-desc">Tus tareas por fecha de inicio y fecha límite, mes a mes.</div>
        </div>
        <div class="header-actions">
          <button class="btn btn-primary" id="btn-new-task-cal">+ Nueva tarea</button>
        </div>
      </div>
      <div class="calendar-toolbar">
        <div class="calendar-nav">
          <button class="btn btn-secondary btn-sm" id="cal-prev" aria-label="Mes anterior">‹</button>
          <button class="btn btn-secondary btn-sm" id="cal-today">Hoy</button>
          <button class="btn btn-secondary btn-sm" id="cal-next" aria-label="Mes siguiente">›</button>
        </div>
        <div class="calendar-month-label" id="cal-month-label"></div>
      </div>
      <div class="calendar-grid" id="calendar-grid"></div>
    </section>

    <!-- PAYMENTS -->
    <section class="view" id="view-payments">
      <div class="view-header">
        <div>
          <h1>Pagos pendientes</h1>
          <div class="view-desc">Facturas por cobrar, con foto de evidencia y el contacto responsable.</div>
        </div>
        <div class="header-actions">
          <input class="search-input" id="search-payments" placeholder="Buscar pago o contacto…">
          <button class="btn btn-primary" id="btn-new-payment">+ Nuevo pago</button>
        </div>
      </div>
      <div id="payments-body"></div>
    </section>

  </main>
</div>

<div class="modal-backdrop" id="modal-backdrop" hidden>
  <div class="modal" id="modal-content" role="dialog" aria-modal="true"></div>
</div>

<div id="toast"></div>

<div class="lightbox-backdrop" id="lightbox-backdrop" hidden>
  <button type="button" class="lightbox-close" id="lightbox-close" aria-label="Cerrar">✕</button>
  <img id="lightbox-img" src="" alt="Evidencia fotográfica">
</div>

<script>
(function(){
  "use strict";

  /* ============ STATE ============ */
  var state = {
    contacts: [],
    companies: [],
    deals: [],
    tasks: [],
    payments: [],
    ui: { view: "dashboard", searchContacts: "", searchCompanies: "", searchPayments: "", filterContactCompany: "", filterContactCity: "", sortContactsDesc: false, calendarYear: null, calendarMonth: null }
  };
  var idCounter = 1;
  function nextId(prefix){ return prefix + "_" + (idCounter++) + "_" + Math.random().toString(36).slice(2,7); }

  /* ============ MODO CONECTADO (servidor + WhatsApp) ============
     Cuando este archivo se abre como artifact/archivo local, funciona igual que siempre
     (todo en memoria, exportar/importar JSON a mano). Cuando lo sirve el backend de
     whatsapp-backend/, detecta el servidor automáticamente y sincroniza en segundo plano:
     así los prospectos capturados por el bot de WhatsApp aparecen solos en la Bitácora. */
  var connectedMode = false;
  var apiToken = "";
  var syncInFlight = false;

  function apiFetch(pathSuffix, options){
    options = options || {};
    var headers = Object.assign({"Content-Type":"application/json"}, options.headers||{});
    if(apiToken) headers["Authorization"] = "Bearer " + apiToken;
    return fetch(pathSuffix, Object.assign({}, options, {headers: headers}));
  }

  // Envía al servidor una creación/edición ya aplicada localmente. "Best effort": si falla
  // (sin conexión, etc.) solo avisa con un toast — los datos siguen bien en el navegador.
  function pushRecord(kind, method, id, data){
    if(!connectedMode) return;
    var path = "/api/" + kind + (id ? "/" + id : "");
    apiFetch(path, {method: method, body: JSON.stringify(data)}).then(function(r){
      if(!r.ok) toast("No se pudo sincronizar con el servidor.");
    }).catch(function(){ toast("Sin conexión con el servidor — el cambio quedó solo en este navegador."); });
  }
  function deleteRecord(kind, id){
    if(!connectedMode) return;
    apiFetch("/api/" + kind + "/" + id, {method:"DELETE"}).catch(function(){
      toast("Sin conexión con el servidor — la eliminación quedó solo en este navegador.");
    });
  }

  // Trae todo lo nuevo del servidor (p. ej. prospectos capturados por WhatsApp) y lo agrega
  // al estado local SIN pisar lo que ya tienes abierto/editado (solo agrega ids que faltan).
  function mergeNewFromServer(serverData){
    var changed = false;
    ["contacts","companies","deals","tasks","payments"].forEach(function(kind){
      var localIds = {};
      state[kind].forEach(function(x){ localIds[x.id] = true; });
      (serverData[kind]||[]).forEach(function(x){
        if(!localIds[x.id]){ state[kind].push(kind==="contacts"?migrateContact(x):(kind==="payments"?migratePayment(x):x)); changed = true; }
      });
    });
    return changed;
  }

  function syncFromServer(){
    if(!connectedMode || syncInFlight) return;
    syncInFlight = true;
    apiFetch("/api/all").then(function(r){
      if(!r.ok) throw new Error("sync failed");
      return r.json();
    }).then(function(data){
      if(mergeNewFromServer(data)) renderAll();
    }).catch(function(){ /* silencioso: se reintenta en el siguiente ciclo */ }).finally(function(){
      syncInFlight = false;
    });
  }

  function showLoginGate(onSuccess){
    var overlay = document.createElement("div");
    overlay.className = "modal-backdrop";
    overlay.innerHTML =
      '<div class="modal" style="max-width:360px;">' +
        '<h2>CRM - Tapicentro</h2>' +
        '<div class="modal-sub">Este servidor está conectado al bot de WhatsApp. Ingresa la contraseña para ver la Bitácora.</div>' +
        '<form id="login-form">' +
          '<div class="field"><label for="login-password">Contraseña</label><input id="login-password" type="password" autocomplete="current-password" required></div>' +
          '<div id="login-error" class="field-hint" style="color:var(--rust);"></div>' +
          '<div class="modal-actions"><div class="left"></div><div class="right"><button type="submit" class="btn btn-primary">Entrar</button></div></div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(overlay);
    document.getElementById("login-password").focus();
    document.getElementById("login-form").addEventListener("submit", function(e){
      e.preventDefault();
      var pass = document.getElementById("login-password").value;
      fetch("/api/login", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({password: pass})})
        .then(function(r){ return r.json().then(function(j){ return {ok:r.ok, json:j}; }); })
        .then(function(res){
          if(!res.ok){ document.getElementById("login-error").textContent = res.json.error || "No se pudo iniciar sesión."; return; }
          apiToken = res.json.token;
          try{ localStorage.setItem("bitacora_api_token", apiToken); }catch(e){}
          document.body.removeChild(overlay);
          onSuccess();
        }).catch(function(){ document.getElementById("login-error").textContent = "Sin conexión con el servidor."; });
    });
  }

  function initConnectedMode(){
    if(location.protocol === "file:") return startStandalone(); // artifact / archivo local: modo normal
    fetch("/api/config").then(function(r){ return r.ok ? r.json() : null; }).catch(function(){ return null; })
      .then(function(cfg){
        if(!cfg || !cfg.connected) return startStandalone();
        connectedMode = true;
        var savedToken = "";
        try{ savedToken = localStorage.getItem("bitacora_api_token") || ""; }catch(e){}
        apiToken = savedToken;
        loadInitialData();
      });
  }

  function loadInitialData(){
    apiFetch("/api/all").then(function(r){
      if(r.status === 401) throw {authRequired:true};
      if(!r.ok) throw new Error("No se pudo cargar la información del servidor.");
      return r.json();
    }).then(function(data){
      state.contacts = (data.contacts||[]).map(migrateContact);
      state.companies = data.companies||[];
      state.deals = data.deals||[];
      state.tasks = data.tasks||[];
      state.payments = (data.payments||[]).map(migratePayment);
      renderAll();
      toast("Conectado al servidor — sincronizando con WhatsApp");
      setInterval(syncFromServer, 20000);
      document.addEventListener("visibilitychange", function(){ if(!document.hidden) syncFromServer(); });
    }).catch(function(err){
      if(err && err.authRequired){
        showLoginGate(loadInitialData);
      } else {
        toast("No se pudo conectar con el servidor, revisa tu conexión.");
        startStandalone();
      }
    });
  }

  var STAGES = [
    { key:"lead",         label:"Lead",         color:"var(--stage-lead)",         hex:"#2a78d6" },
    { key:"contactado",   label:"Contactado",   color:"var(--stage-contactado)",   hex:"#1baf7a" },
    { key:"propuesta",    label:"Propuesta",    color:"var(--stage-propuesta)",    hex:"#b5860a" },
    { key:"negociacion",  label:"Negociación",  color:"var(--stage-negociacion)",  hex:"#eb6834" },
    { key:"ganado",       label:"Ganado",       color:"var(--good)",               hex:"#0ca30c" },
    { key:"perdido",      label:"Perdido",      color:"var(--critical)",           hex:"#d03b3b" }
  ];
  var OPEN_STAGE_KEYS = ["lead","contactado","propuesta","negociacion"];
  function stageMeta(key){ return STAGES.find(function(s){ return s.key === key; }); }

  /* ============ HELPERS ============ */
  function esc(str){
    if(str === undefined || str === null) return "";
    return String(str).replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
    });
  }
  function fmtMoney(n){
    n = Number(n)||0;
    return "$" + n.toLocaleString("es-MX", {maximumFractionDigits:0});
  }
  function fmtDate(iso){
    if(!iso) return "—";
    var d = new Date(iso + "T00:00:00");
    if(isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("es-MX", {day:"2-digit", month:"short"});
  }
  function todayISO(){
    var d = new Date();
    var tz = d.getTimezoneOffset()*60000;
    return new Date(d.getTime()-tz).toISOString().slice(0,10);
  }
  function isOverdue(iso){ return !!iso && iso < todayISO(); }
  function isToday(iso){ return iso === todayISO(); }
  function companyName(id){ var c = state.companies.find(function(x){return x.id===id;}); return c ? c.name : ""; }
  function contactFullName(c){
    if(!c) return "";
    var full = ((c.firstName||"") + " " + (c.lastName||"")).trim();
    return full || c.name || "";
  }
  function contactName(id){ return contactFullName(state.contacts.find(function(x){return x.id===id;})); }
  /* Convierte un contacto exportado con el formato anterior (campo "name" único) al nuevo formato */
  function migrateContact(c){
    if(!c.firstName && !c.lastName && c.name){
      var parts = String(c.name).trim().split(/\s+/);
      if(parts.length > 1){ c.lastName = parts.pop(); c.firstName = parts.join(" "); }
      else { c.firstName = parts[0] || ""; c.lastName = ""; }
    }
    if(!c.address) c.address = { hasAddress:true, street:"", neighborhood:"", city:"", references:"" };
    else if(c.address.hasAddress === undefined) c.address.hasAddress = true;
    return c;
  }
  function dealTitle(id){ var d = state.deals.find(function(x){return x.id===id;}); return d ? d.title : ""; }
  /* Convierte un pago exportado con el formato anterior (campo "dueDate") al nuevo formato ("purchaseDate") */
  function migratePayment(p){
    if(p.purchaseDate === undefined) p.purchaseDate = p.dueDate || "";
    if(p.notes === undefined) p.notes = "";
    return p;
  }

  /* Borra un contacto y limpia las referencias que quedan en negocios, tareas y pagos */
  function removeContactEverywhere(contactId){
    state.contacts = state.contacts.filter(function(c){ return c.id !== contactId; });
    state.deals.forEach(function(d){ if(d.contactId === contactId) d.contactId = ""; });
    state.tasks.forEach(function(t){
      if(t.relatedContactIds) t.relatedContactIds = t.relatedContactIds.filter(function(id){ return id !== contactId; });
    });
    state.payments.forEach(function(p){ if(p.contactId === contactId) p.contactId = ""; });
  }

  function toast(msg){
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function(){ el.classList.remove("show"); }, 2200);
  }

  /* Lee una imagen y la devuelve como dataURL comprimido (para no inflar el export JSON) */
  function loadImageAsCompressedDataURL(file, maxDim, quality){
    return new Promise(function(resolve, reject){
      if(!file.type || file.type.indexOf("image/") !== 0){ reject(new Error("no es una imagen")); return; }
      var reader = new FileReader();
      reader.onload = function(){
        var img = new Image();
        img.onload = function(){
          var w = img.width, h = img.height;
          var scale = Math.min(1, maxDim / Math.max(w, h));
          var cw = Math.max(1, Math.round(w * scale));
          var ch = Math.max(1, Math.round(h * scale));
          var canvas = document.createElement("canvas");
          canvas.width = cw; canvas.height = ch;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, cw, ch);
          try{ resolve(canvas.toDataURL("image/jpeg", quality)); }
          catch(err){ reject(err); }
        };
        img.onerror = function(){ reject(new Error("no se pudo leer la imagen")); };
        img.src = reader.result;
      };
      reader.onerror = function(){ reject(new Error("no se pudo leer el archivo")); };
      reader.readAsDataURL(file);
    });
  }

  /* ============ LIGHTBOX (ver foto en grande) ============ */
  var lightboxBackdrop = document.getElementById("lightbox-backdrop");
  var lightboxImg = document.getElementById("lightbox-img");
  function openLightbox(src){
    lightboxImg.src = src;
    lightboxBackdrop.hidden = false;
  }
  function closeLightbox(){
    lightboxBackdrop.hidden = true;
    lightboxImg.src = "";
  }
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", function(e){ if(e.target === lightboxBackdrop) closeLightbox(); });

  /* ============ NAV / VIEW SWITCH ============ */
  document.getElementById("main-nav").addEventListener("click", function(e){
    var btn = e.target.closest(".tab-btn");
    if(!btn) return;
    setView(btn.getAttribute("data-view"));
  });
  function setView(view){
    state.ui.view = view;
    document.querySelectorAll(".tab-btn").forEach(function(b){
      b.classList.toggle("active", b.getAttribute("data-view") === view);
    });
    document.querySelectorAll("section.view").forEach(function(s){
      s.classList.toggle("active", s.id === "view-" + view);
    });
    renderAll();
  }

  /* ============ RENDER: DASHBOARD ============ */
  function renderDashboard(){
    document.getElementById("stat-contacts").textContent = state.contacts.length;
    var openDeals = state.deals.filter(function(d){ return OPEN_STAGE_KEYS.indexOf(d.stage) !== -1; });
    document.getElementById("stat-open-deals").textContent = openDeals.length;
    var pipelineValue = openDeals.reduce(function(sum,d){ return sum + (Number(d.value)||0); }, 0);
    document.getElementById("stat-pipeline-value").textContent = fmtMoney(pipelineValue);
    var tasksToday = state.tasks.filter(function(t){ return !t.done && isToday(t.dueDate); });
    document.getElementById("stat-tasks-today").textContent = tasksToday.length;
    var pendingPayments = state.payments.filter(function(p){ return p.status !== "pagado"; });
    var pendingPaymentsTotal = pendingPayments.reduce(function(sum,p){ return sum + (Number(p.amount)||0); }, 0);
    document.getElementById("stat-pending-payments").textContent = fmtMoney(pendingPaymentsTotal);

    var maxCount = Math.max.apply(null, OPEN_STAGE_KEYS.map(function(k){
      return state.deals.filter(function(d){ return d.stage===k; }).length;
    }).concat([1]));
    var barsHtml = OPEN_STAGE_KEYS.map(function(k){
      var meta = stageMeta(k);
      var count = state.deals.filter(function(d){ return d.stage===k; }).length;
      var pct = Math.round((count/maxCount)*100);
      return '<div class="stage-bar-row">' +
        '<div class="stage-name">'+esc(meta.label)+'</div>' +
        '<div class="stage-bar-track"><div class="stage-bar-fill" style="width:'+pct+'%; background:'+meta.color+';"></div></div>' +
        '<div class="stage-count">'+count+'</div>' +
      '</div>';
    }).join("");
    document.getElementById("stage-bars").innerHTML = state.deals.length ? barsHtml :
      '<div class="empty-state-mini">Crea tu primer negocio en Pipeline para ver la distribución aquí.</div>';

    var todayHtml = tasksToday.map(function(t){
      return '<div class="task-row">' +
        '<input type="checkbox" class="task-check" data-toggle-task="'+t.id+'">' +
        '<div class="task-title">'+esc(t.title)+'</div>' +
      '</div>';
    }).join("");
    document.getElementById("dash-tasks-today").innerHTML = tasksToday.length ? todayHtml :
      '<div class="empty-state-mini">No tienes tareas para hoy. Agrega una desde Tareas.</div>';
  }

  /* ============ RENDER: CONTACTS ============ */
  function updateContactFilterOptions(){
    var compSel = document.getElementById("filter-contact-company");
    if(compSel){
      var compOpts = '<option value="">Todas las empresas</option>';
      state.companies.forEach(function(c){
        compOpts += '<option value="'+c.id+'" '+(c.id===state.ui.filterContactCompany?"selected":"")+'>'+esc(c.name)+'</option>';
      });
      compSel.innerHTML = compOpts;
    }
    var citySel = document.getElementById("filter-contact-city");
    if(citySel){
      var cities = [];
      state.contacts.forEach(function(c){
        var city = c.address && c.address.city ? c.address.city.trim() : "";
        if(city && cities.indexOf(city) === -1) cities.push(city);
      });
      cities.sort(function(a,b){ return a.localeCompare(b, "es"); });
      var cityOpts = '<option value="">Todas las ciudades</option>';
      cities.forEach(function(city){
        cityOpts += '<option value="'+esc(city)+'" '+(city===state.ui.filterContactCity?"selected":"")+'>'+esc(city)+'</option>';
      });
      citySel.innerHTML = cityOpts;
    }
    var sortBtn = document.getElementById("btn-sort-contacts");
    if(sortBtn) sortBtn.textContent = "Apellido " + (state.ui.sortContactsDesc ? "↓" : "↑");
  }

  function renderContacts(){
    updateContactFilterOptions();
    var q = state.ui.searchContacts.trim().toLowerCase();
    var list = state.contacts.filter(function(c){
      if(state.ui.filterContactCompany && c.companyId !== state.ui.filterContactCompany) return false;
      if(state.ui.filterContactCity && (!c.address || (c.address.city||"").trim() !== state.ui.filterContactCity)) return false;
      if(!q) return true;
      var addr = c.address || {};
      var haystack = [contactFullName(c), c.email, c.phone, companyName(c.companyId), addr.street, addr.neighborhood, addr.city, addr.references]
        .filter(Boolean).join(" ").toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
    list.sort(function(a,b){
      var la = (a.lastName || a.firstName || a.name || "").toLowerCase();
      var lb = (b.lastName || b.firstName || b.name || "").toLowerCase();
      var cmp = la.localeCompare(lb, "es");
      if(cmp === 0) cmp = (a.firstName||"").toLowerCase().localeCompare((b.firstName||"").toLowerCase(), "es");
      return state.ui.sortContactsDesc ? -cmp : cmp;
    });
    var body = document.getElementById("contacts-body");
    if(state.contacts.length === 0){
      body.innerHTML = '<div class="table-wrap"><div class="empty-state">' +
        '<h3>Aún no hay contactos</h3>' +
        '<p>Agrega a la primera persona con la que estás en contacto: un cliente, un prospecto o un aliado.</p>' +
        '<button class="btn btn-primary" id="empty-new-contact">+ Nuevo contacto</button>' +
        '</div></div>';
      document.getElementById("empty-new-contact").addEventListener("click", function(){ openContactModal(); });
      return;
    }
    if(list.length === 0){
      var msg = q ? 'Ningún contacto coincide con “'+esc(q)+'”.' : 'Ningún contacto coincide con los filtros aplicados.';
      body.innerHTML = '<div class="table-wrap"><div class="empty-state-mini">'+msg+'</div></div>';
      return;
    }
    var rows = list.map(function(c){
      return '<tr data-open-contact="'+c.id+'">' +
        '<td class="cell-primary">'+esc(contactFullName(c))+(c.source==="whatsapp"?' <span class="chip wa-chip" title="Capturado desde WhatsApp">WhatsApp</span>':'')+'</td>' +
        '<td class="cell-muted">'+esc(companyName(c.companyId) || "—")+'</td>' +
        '<td class="cell-muted">'+esc((c.address && c.address.city) || "—")+(c.address && c.address.hasAddress===false ? ' <span class="chip">Ocurre</span>' : '')+'</td>' +
        '<td class="cell-muted">'+esc(c.email || "—")+'</td>' +
        '<td class="cell-muted">'+esc(c.phone || "—")+'</td>' +
        '<td><div class="row-actions">' +
          '<button class="icon-btn" title="Editar" data-edit-contact="'+c.id+'">✎</button>' +
          '<button class="icon-btn" title="Eliminar" data-del-contact="'+c.id+'">✕</button>' +
        '</div></td>' +
      '</tr>';
    }).join("");
    body.innerHTML = '<div class="table-wrap"><table class="ledger">' +
      '<thead><tr><th>Nombre</th><th>Empresa</th><th>Ciudad</th><th>Correo</th><th>Teléfono</th><th></th></tr></thead>' +
      '<tbody>'+rows+'</tbody></table></div>';
  }

  /* ============ RENDER: COMPANIES ============ */
  function renderCompanies(){
    var q = state.ui.searchCompanies.trim().toLowerCase();
    var list = state.companies.filter(function(c){
      if(!q) return true;
      return (c.name||"").toLowerCase().indexOf(q)!==-1 || (c.industry||"").toLowerCase().indexOf(q)!==-1;
    });
    var body = document.getElementById("companies-body");
    if(state.companies.length === 0){
      body.innerHTML = '<div class="table-wrap"><div class="empty-state">' +
        '<h3>Aún no hay empresas</h3>' +
        '<p>Registra la primera organización con la que trabajas para poder vincular contactos y negocios.</p>' +
        '<button class="btn btn-primary" id="empty-new-company">+ Nueva empresa</button>' +
        '</div></div>';
      document.getElementById("empty-new-company").addEventListener("click", function(){ openCompanyModal(); });
      return;
    }
    if(list.length === 0){
      body.innerHTML = '<div class="table-wrap"><div class="empty-state-mini">Ninguna empresa coincide con “'+esc(q)+'”.</div></div>';
      return;
    }
    var rows = list.map(function(c){
      var n = state.contacts.filter(function(x){return x.companyId===c.id;}).length;
      return '<tr data-open-company="'+c.id+'">' +
        '<td class="cell-primary">'+esc(c.name)+'</td>' +
        '<td class="cell-muted">'+esc(c.industry || "—")+'</td>' +
        '<td class="cell-muted">'+esc(c.website || "—")+'</td>' +
        '<td class="cell-muted mono">'+n+' contacto'+(n===1?"":"s")+'</td>' +
        '<td><div class="row-actions">' +
          '<button class="icon-btn" title="Editar" data-edit-company="'+c.id+'">✎</button>' +
          '<button class="icon-btn" title="Eliminar" data-del-company="'+c.id+'">✕</button>' +
        '</div></td>' +
      '</tr>';
    }).join("");
    body.innerHTML = '<div class="table-wrap"><table class="ledger">' +
      '<thead><tr><th>Empresa</th><th>Giro</th><th>Sitio web</th><th>Contactos</th><th></th></tr></thead>' +
      '<tbody>'+rows+'</tbody></table></div>';
  }

  /* ============ RENDER: PIPELINE ============ */
  function renderPipeline(){
    var board = document.getElementById("pipeline-board");
    board.innerHTML = STAGES.map(function(stage){
      var deals = state.deals.filter(function(d){ return d.stage === stage.key; });
      var cardsHtml = deals.map(function(d){
        var optHtml = STAGES.map(function(s){
          return '<option value="'+s.key+'" '+(s.key===d.stage?"selected":"")+'>'+esc(s.label)+'</option>';
        }).join("");
        return '<div class="deal-card" draggable="true" data-deal-id="'+d.id+'" style="border-left-color:'+stage.color+';">' +
          '<div class="deal-title" data-open-deal="'+d.id+'">'+esc(d.title)+(d.source==="whatsapp"?' <span class="chip wa-chip" title="Capturado desde WhatsApp">WhatsApp</span>':'')+'</div>' +
          '<div class="deal-org">'+esc(companyName(d.companyId) || contactName(d.contactId) || "Sin vincular")+'</div>' +
          '<div class="deal-value mono">'+fmtMoney(d.value)+'</div>' +
          '<div class="deal-meta">' +
            '<span class="deal-next">'+(d.nextStepDate ? "Próx: "+fmtDate(d.nextStepDate) : "")+'</span>' +
            '<select class="stage-move" data-move-deal="'+d.id+'">'+optHtml+'</select>' +
          '</div>' +
        '</div>';
      }).join("");
      return '<div class="stage-col" data-stage-col="'+stage.key+'">' +
        '<div class="stage-col-head"><span class="stage-tab" style="background:'+stage.color+';"></span>' +
          '<span class="stage-title">'+esc(stage.label)+'</span>' +
          '<span class="stage-count mono">'+deals.length+'</span>' +
        '</div>' +
        '<div class="stage-col-body">'+cardsHtml+
          (deals.length===0 ? '<div class="empty-state-mini" style="padding:14px 6px;">Sin negocios</div>' : '') +
        '</div>' +
      '</div>';
    }).join("");
    attachDragAndDrop();
  }

  function attachDragAndDrop(){
    document.querySelectorAll(".deal-card").forEach(function(card){
      card.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text/plain", card.getAttribute("data-deal-id"));
        e.dataTransfer.effectAllowed = "move";
      });
    });
    document.querySelectorAll(".stage-col").forEach(function(col){
      col.addEventListener("dragover", function(e){
        e.preventDefault();
        col.classList.add("drag-over");
      });
      col.addEventListener("dragleave", function(){ col.classList.remove("drag-over"); });
      col.addEventListener("drop", function(e){
        e.preventDefault();
        col.classList.remove("drag-over");
        var dealId = e.dataTransfer.getData("text/plain");
        moveDealStage(dealId, col.getAttribute("data-stage-col"));
      });
    });
  }
  function moveDealStage(dealId, newStage){
    var deal = state.deals.find(function(d){ return d.id===dealId; });
    if(!deal || deal.stage===newStage) return;
    deal.stage = newStage;
    pushRecord("deals","PUT",deal.id,deal);
    renderAll();
    toast('Movido a "'+stageMeta(newStage).label+'"');
  }

  /* ============ RENDER: TASKS ============ */
  function renderTasks(){
    var container = document.getElementById("task-groups");

    if(state.tasks.length === 0){
      container.innerHTML = '<div class="task-list"><div class="empty-state">' +
        '<h3>No hay tareas todavía</h3>' +
        '<p>Anota tu próximo paso, asígnalo a uno o varios contactos y adjunta una foto de evidencia si quieres.</p>' +
        '<button class="btn btn-primary" id="empty-new-task">+ Nueva tarea</button>' +
        '</div></div>';
      document.getElementById("empty-new-task").addEventListener("click", function(){ openTaskModal(); });
      return;
    }

    var pending = state.tasks.filter(function(t){ return !t.done; });
    var overdue = pending.filter(function(t){ return isOverdue(t.dueDate); });
    var today = pending.filter(function(t){ return isToday(t.dueDate); });
    var upcoming = pending.filter(function(t){ return t.dueDate && t.dueDate > todayISO(); });
    var noDate = pending.filter(function(t){ return !t.dueDate; });
    var done = state.tasks.filter(function(t){ return t.done; });

    function group(title, items){
      if(items.length===0) return "";
      var rows = items.map(taskRowHtml).join("");
      return '<div class="task-group"><h2>'+title+' <span class="badge">'+items.length+'</span></h2>' +
        '<div class="task-list">'+rows+'</div></div>';
    }
    function taskRowHtml(t){
      var subParts = [];
      var assignedNames = (t.relatedContactIds||[]).map(contactName).filter(Boolean);
      if(assignedNames.length) subParts.push(assignedNames.join(", "));
      if(t.relatedDealId) subParts.push(dealTitle(t.relatedDealId));
      if(t.notes) subParts.push(t.notes);
      var badgeClass = "task-due-badge" + (isOverdue(t.dueDate) && !t.done ? " overdue" : (isToday(t.dueDate) ? " today" : ""));
      var dateLabel = t.startDate && t.dueDate ? fmtDate(t.startDate)+" → "+fmtDate(t.dueDate) : fmtDate(t.dueDate||t.startDate||"");
      return '<div class="task-item '+(t.done?"done":"")+'">' +
        '<input type="checkbox" '+(t.done?"checked":"")+' data-toggle-task="'+t.id+'">' +
        (t.photo ? '<button type="button" class="task-photo-thumb" style="background-image:url(\''+t.photo+'\')" data-view-task-photo="'+t.id+'" aria-label="Ver fotografía adjunta"></button>' : '') +
        '<div style="flex:1;">' +
          '<div class="task-title">'+esc(t.title)+(t.source==="whatsapp"?' <span class="chip wa-chip" title="Capturado desde WhatsApp">WhatsApp</span>':'')+(t.source==="whatsapp_unclassified"?' <span class="chip wa-chip wa-chip-alert" title="Mensaje de WhatsApp que el bot no pudo clasificar">WhatsApp · revisar</span>':'')+'</div>' +
          (subParts.length ? '<div class="task-sub">'+esc(subParts.join(" · "))+'</div>' : '') +
        '</div>' +
        ((t.dueDate||t.startDate) ? '<div class="'+badgeClass+' mono">'+esc(dateLabel)+'</div>' : '') +
        '<button class="icon-btn" title="Editar" data-edit-task="'+t.id+'">✎</button>' +
        '<button class="icon-btn" title="Eliminar" data-del-task="'+t.id+'">✕</button>' +
      '</div>';
    }
    container.innerHTML =
      group("Vencidas", overdue) +
      group("Hoy", today) +
      group("Próximas", upcoming) +
      group("Sin fecha", noDate) +
      group("Completadas", done);
  }

  /* ============ RENDER: CALENDAR ============ */
  function isoForYMD(y, m, d){
    var dt = new Date(y, m, d);
    var tz = dt.getTimezoneOffset()*60000;
    return new Date(dt.getTime()-tz).toISOString().slice(0,10);
  }
  function ensureCalendarInit(){
    if(state.ui.calendarYear === null || state.ui.calendarMonth === null){
      var parts = todayISO().split("-");
      state.ui.calendarYear = Number(parts[0]);
      state.ui.calendarMonth = Number(parts[1]) - 1;
    }
  }
  function shiftCalendarMonth(delta){
    ensureCalendarInit();
    var m = state.ui.calendarMonth + delta;
    var y = state.ui.calendarYear;
    if(m < 0){ m = 11; y--; } else if(m > 11){ m = 0; y++; }
    state.ui.calendarMonth = m;
    state.ui.calendarYear = y;
    renderCalendar();
  }
  function jumpCalendarToToday(){
    var parts = todayISO().split("-");
    state.ui.calendarYear = Number(parts[0]);
    state.ui.calendarMonth = Number(parts[1]) - 1;
    renderCalendar();
  }
  function renderCalendar(){
    ensureCalendarInit();
    var year = state.ui.calendarYear, month = state.ui.calendarMonth;
    var label = document.getElementById("cal-month-label");
    var grid = document.getElementById("calendar-grid");
    if(!label || !grid) return;

    var monthDate = new Date(year, month, 1);
    var monthLabelText = monthDate.toLocaleDateString("es-MX", {month:"long", year:"numeric"});
    label.textContent = monthLabelText.charAt(0).toUpperCase() + monthLabelText.slice(1);

    var firstWeekday = monthDate.getDay(); // 0=Dom..6=Sáb
    var leadingOffset = (firstWeekday + 6) % 7; // 0=Lun
    var daysInMonth = new Date(year, month+1, 0).getDate();
    var daysInPrevMonth = new Date(year, month, 0).getDate();

    var cells = [];
    for(var i = leadingOffset - 1; i >= 0; i--){
      var pd = daysInPrevMonth - i;
      cells.push({ day: pd, outside: true, iso: isoForYMD(year, month-1, pd) });
    }
    for(var d = 1; d <= daysInMonth; d++){
      cells.push({ day: d, outside: false, iso: isoForYMD(year, month, d) });
    }
    var nextDay = 1;
    while(cells.length % 7 !== 0){
      cells.push({ day: nextDay, outside: true, iso: isoForYMD(year, month+1, nextDay) });
      nextDay++;
    }

    var weekdayLabels = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
    var html = weekdayLabels.map(function(w){ return '<div class="calendar-weekday">'+w+'</div>'; }).join("");

    var todayStr = todayISO();
    html += cells.map(function(c){
      var dayTasks = state.tasks.filter(function(t){
        var start = t.startDate || t.dueDate;
        var due = t.dueDate || t.startDate;
        if(!start || !due) return false;
        return c.iso >= start && c.iso <= due;
      }).sort(function(a,b){ return (a.dueDate||a.startDate||"").localeCompare(b.dueDate||b.startDate||""); });

      var visible = dayTasks.slice(0, 3);
      var extra = dayTasks.length - visible.length;

      var chips = visible.map(function(t){
        var cls = "calendar-task-chip";
        if(t.done) cls += " done";
        else if(isOverdue(t.dueDate)) cls += " overdue";
        return '<div class="'+cls+'" data-edit-task="'+t.id+'" title="'+esc(t.title)+'">'+esc(t.title)+'</div>';
      }).join("");
      var moreHtml = extra > 0 ? '<div class="calendar-more">+'+extra+' más</div>' : "";

      var classes = "calendar-cell" + (c.outside ? " outside" : "") + (c.iso === todayStr ? " today" : "");
      return '<div class="'+classes+'">' +
        '<div class="calendar-daynum">'+c.day+'</div>' +
        chips + moreHtml +
      '</div>';
    }).join("");

    grid.innerHTML = html;
  }

  /* ============ RENDER: PAYMENTS ============ */
  function renderPayments(){
    var container = document.getElementById("payments-body");
    if(state.payments.length === 0){
      container.innerHTML = '<div class="task-list"><div class="empty-state">' +
        '<h3>No hay pagos pendientes registrados</h3>' +
        '<p>Registra una factura por cobrar, adjunta la foto como evidencia y asígnala a un contacto.</p>' +
        '<button class="btn btn-primary" id="empty-new-payment">+ Nuevo pago</button>' +
        '</div></div>';
      document.getElementById("empty-new-payment").addEventListener("click", function(){ openPaymentModal(); });
      return;
    }
    var q = state.ui.searchPayments.trim().toLowerCase();
    var list = state.payments.filter(function(p){
      if(!q) return true;
      return (p.description||"").toLowerCase().indexOf(q)!==-1 || (p.notes||"").toLowerCase().indexOf(q)!==-1 || contactName(p.contactId).toLowerCase().indexOf(q)!==-1;
    });
    if(list.length === 0){
      container.innerHTML = '<div class="task-list"><div class="empty-state-mini">Ningún pago coincide con “'+esc(q)+'”.</div></div>';
      return;
    }
    var pending = list.filter(function(p){ return p.status !== "pagado"; });
    var paid = list.filter(function(p){ return p.status === "pagado"; });

    function row(p){
      return '<div class="task-item">' +
        '<input type="checkbox" '+(p.status==="pagado"?"checked":"")+' data-toggle-payment="'+p.id+'" title="Marcar como pagado">' +
        (p.photo ? '<button type="button" class="task-photo-thumb" style="background-image:url(\''+p.photo+'\')" data-view-payment-photo="'+p.id+'" aria-label="Ver evidencia de factura"></button>' : '') +
        '<div style="flex:1;">' +
          '<div class="task-title">'+esc(p.description)+' <span class="chip payment-chip mono">'+fmtMoney(p.amount)+'</span>'+(p.status==="pagado"?' <span class="chip status-chip-paid">Pagado</span>':'')+'</div>' +
          (contactName(p.contactId) ? '<div class="task-sub">'+esc(contactName(p.contactId))+'</div>' : '') +
          (p.notes ? '<div class="task-sub">'+esc(p.notes)+'</div>' : '') +
        '</div>' +
        (p.purchaseDate ? '<div class="task-due-badge mono">'+fmtDate(p.purchaseDate)+'</div>' : '') +
        '<button class="icon-btn" title="Editar" data-edit-payment="'+p.id+'">✎</button>' +
        '<button class="icon-btn" title="Eliminar" data-del-payment="'+p.id+'">✕</button>' +
      '</div>';
    }
    function group(title, items){
      if(items.length===0) return "";
      return '<div class="task-group"><h2>'+title+' <span class="badge">'+items.length+'</span></h2>' +
        '<div class="task-list">'+items.map(row).join("")+'</div></div>';
    }
    container.innerHTML = group("Pendientes", pending) + group("Pagados", paid);
  }

  /* ============ NAV COUNTS ============ */
  function renderNavCounts(){
    document.getElementById("nav-count-contacts").textContent = state.contacts.length;
    document.getElementById("nav-count-companies").textContent = state.companies.length;
    document.getElementById("nav-count-pipeline").textContent = state.deals.filter(function(d){ return OPEN_STAGE_KEYS.indexOf(d.stage)!==-1; }).length;
    document.getElementById("nav-count-tasks").textContent = state.tasks.filter(function(t){ return !t.done; }).length;
    document.getElementById("nav-count-payments").textContent = state.payments.filter(function(p){ return p.status!=="pagado"; }).length;
  }

  function renderAll(){
    renderNavCounts();
    renderDashboard();
    renderContacts();
    renderCompanies();
    renderPipeline();
    renderTasks();
    renderCalendar();
    renderPayments();
  }

  /* ============ MODALS ============ */
  var backdrop = document.getElementById("modal-backdrop");
  var modalEl = document.getElementById("modal-content");
  function closeModal(){ backdrop.hidden = true; modalEl.innerHTML = ""; }
  backdrop.addEventListener("click", function(e){ if(e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", function(e){
    if(e.key!=="Escape") return;
    if(!backdrop.hidden) closeModal();
    if(!lightboxBackdrop.hidden) closeLightbox();
  });

  function companyOptions(selectedId){
    var opts = '<option value="">Sin empresa</option>';
    state.companies.forEach(function(c){
      opts += '<option value="'+c.id+'" '+(c.id===selectedId?"selected":"")+'>'+esc(c.name)+'</option>';
    });
    return opts;
  }
  function sortedContacts(){
    return state.contacts.slice().sort(function(a,b){
      var la = (a.lastName || a.firstName || a.name || "").toLowerCase();
      var lb = (b.lastName || b.firstName || b.name || "").toLowerCase();
      return la.localeCompare(lb, "es");
    });
  }
  function contactOptions(selectedId){
    var opts = '<option value="">Sin contacto</option>';
    sortedContacts().forEach(function(c){
      opts += '<option value="'+c.id+'" '+(c.id===selectedId?"selected":"")+'>'+esc(contactFullName(c))+'</option>';
    });
    return opts;
  }
  function dealOptions(selectedId){
    var opts = '<option value="">Sin negocio</option>';
    state.deals.forEach(function(d){
      opts += '<option value="'+d.id+'" '+(d.id===selectedId?"selected":"")+'>'+esc(d.title)+'</option>';
    });
    return opts;
  }
  function contactCheckboxList(selectedIds){
    selectedIds = selectedIds || [];
    if(state.contacts.length === 0){
      return '<div class="field-hint">Aún no tienes contactos — agrégalos primero en Contactos.</div>';
    }
    return '<div class="contact-check-list">' + sortedContacts().map(function(c){
      var checked = selectedIds.indexOf(c.id) !== -1 ? "checked" : "";
      return '<label class="contact-check-row"><input type="checkbox" value="'+c.id+'" '+checked+'> '+esc(contactFullName(c))+'</label>';
    }).join("") + '</div>';
  }

  function openContactModal(existing){
    var isEdit = !!existing;
    var addr = (existing && existing.address) || {};
    var hasAddress = addr.hasAddress !== false;
    modalEl.innerHTML =
      '<h2>'+(isEdit?"Editar contacto":"Nuevo contacto")+'</h2>' +
      '<div class="modal-sub">Guarda a la persona, vincúlala a una empresa y registra su dirección si la necesitas.</div>' +
      '<form id="contact-form">' +
        '<div class="field-row">' +
          '<div class="field"><label for="f-firstname">Nombre(s)*</label><input id="f-firstname" required value="'+esc(existing?existing.firstName:"")+'" placeholder="Ej. Ana"></div>' +
          '<div class="field"><label for="f-lastname">Apellidos</label><input id="f-lastname" value="'+esc(existing?existing.lastName:"")+'" placeholder="Ej. Torres López"></div>' +
        '</div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="f-email">Correo</label><input id="f-email" type="email" value="'+esc(existing?existing.email:"")+'" placeholder="ana@empresa.com"></div>' +
          '<div class="field"><label for="f-phone">Teléfono</label><input id="f-phone" value="'+esc(existing?existing.phone:"")+'" placeholder="55 0000 0000"></div>' +
        '</div>' +
        '<div class="field"><label for="f-company">Empresa</label><select id="f-company">'+companyOptions(existing?existing.companyId:"")+'</select></div>' +
        '<div class="form-section-label">Dirección</div>' +
        '<div class="field"><label for="f-has-address">¿Cuenta con dirección?</label><select id="f-has-address">' +
          '<option value="si" '+(hasAddress?"selected":"")+'>Sí</option>' +
          '<option value="no" '+(!hasAddress?"selected":"")+'>No — ocurre</option>' +
        '</select></div>' +
        '<div class="occurs-box" id="f-occurs-box" style="'+(hasAddress?"display:none;":"")+'">Ocurre</div>' +
        '<div class="field"><label for="f-street">Calle y número</label><input id="f-street" '+(hasAddress?"":"disabled")+' value="'+esc(hasAddress?addr.street:"")+'" placeholder="Ej. Av. Teófilo Borunda 1400"></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="f-neighborhood">Colonia</label><input id="f-neighborhood" '+(hasAddress?"":"disabled")+' value="'+esc(hasAddress?addr.neighborhood:"")+'" placeholder="Ej. Col. Santa Rita"></div>' +
          '<div class="field"><label for="f-city">Ciudad</label><input id="f-city" value="'+esc(addr.city)+'" placeholder="Ej. Chihuahua, Chih."></div>' +
        '</div>' +
        '<div class="field"><label for="f-references">Referencias</label><input id="f-references" '+(hasAddress?"":"disabled")+' value="'+esc(hasAddress?addr.references:"")+'" placeholder="Ej. Frente a Plaza Sendero, local 12"></div>' +
        '<div class="field"><label for="f-notes">Notas</label><textarea id="f-notes" placeholder="Contexto, cómo se conocieron, intereses…">'+esc(existing?existing.notes:"")+'</textarea></div>' +
        '<div class="modal-actions">' +
          '<div class="left">'+(isEdit?'<button type="button" class="btn btn-danger btn-sm" id="modal-del">Eliminar</button>':'')+'</div>' +
          '<div class="right"><button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button><button type="submit" class="btn btn-primary">Guardar</button></div>' +
        '</div>' +
      '</form>';
    backdrop.hidden = false;
    document.getElementById("f-firstname").focus();
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    document.getElementById("f-has-address").addEventListener("change", function(){
      var nowHasAddress = this.value === "si";
      document.getElementById("f-occurs-box").style.display = nowHasAddress ? "none" : "flex";
      ["f-street","f-neighborhood","f-references"].forEach(function(id){
        var el = document.getElementById(id);
        el.disabled = !nowHasAddress;
        if(!nowHasAddress) el.value = "";
      });
    });
    if(isEdit) document.getElementById("modal-del").addEventListener("click", function(){
      removeContactEverywhere(existing.id);
      deleteRecord("contacts", existing.id);
      closeModal(); renderAll(); toast("Contacto eliminado");
    });
    document.getElementById("contact-form").addEventListener("submit", function(e){
      e.preventDefault();
      var firstName = document.getElementById("f-firstname").value.trim();
      if(!firstName) return;
      var savedHasAddress = document.getElementById("f-has-address").value === "si";
      var data = {
        firstName: firstName,
        lastName: document.getElementById("f-lastname").value.trim(),
        email: document.getElementById("f-email").value.trim(),
        phone: document.getElementById("f-phone").value.trim(),
        companyId: document.getElementById("f-company").value,
        address: {
          hasAddress: savedHasAddress,
          street: savedHasAddress ? document.getElementById("f-street").value.trim() : "",
          neighborhood: savedHasAddress ? document.getElementById("f-neighborhood").value.trim() : "",
          city: document.getElementById("f-city").value.trim(),
          references: savedHasAddress ? document.getElementById("f-references").value.trim() : ""
        },
        notes: document.getElementById("f-notes").value.trim()
      };
      if(isEdit){ Object.assign(existing, data); pushRecord("contacts","PUT",existing.id,existing); toast("Contacto actualizado"); }
      else { data.id = nextId("contact"); data.createdAt = todayISO(); state.contacts.push(data); pushRecord("contacts","POST",null,data); toast("Contacto guardado"); }
      closeModal(); renderAll();
    });
  }

  function openCompanyModal(existing){
    var isEdit = !!existing;
    modalEl.innerHTML =
      '<h2>'+(isEdit?"Editar empresa":"Nueva empresa")+'</h2>' +
      '<div class="modal-sub">Registra la organización para vincular contactos y negocios.</div>' +
      '<form id="company-form">' +
        '<div class="field"><label for="c-name">Nombre*</label><input id="c-name" required value="'+esc(existing?existing.name:"")+'" placeholder="Ej. Materiales del Norte"></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="c-industry">Giro</label><input id="c-industry" value="'+esc(existing?existing.industry:"")+'" placeholder="Ej. Construcción"></div>' +
          '<div class="field"><label for="c-website">Sitio web</label><input id="c-website" value="'+esc(existing?existing.website:"")+'" placeholder="empresa.com"></div>' +
        '</div>' +
        '<div class="field"><label for="c-notes">Notas</label><textarea id="c-notes" placeholder="Contexto de la relación…">'+esc(existing?existing.notes:"")+'</textarea></div>' +
        '<div class="modal-actions">' +
          '<div class="left">'+(isEdit?'<button type="button" class="btn btn-danger btn-sm" id="modal-del">Eliminar</button>':'')+'</div>' +
          '<div class="right"><button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button><button type="submit" class="btn btn-primary">Guardar</button></div>' +
        '</div>' +
      '</form>';
    backdrop.hidden = false;
    document.getElementById("c-name").focus();
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    if(isEdit) document.getElementById("modal-del").addEventListener("click", function(){
      state.companies = state.companies.filter(function(c){ return c.id!==existing.id; });
      state.contacts.forEach(function(c){ if(c.companyId===existing.id) c.companyId=""; });
      state.deals.forEach(function(d){ if(d.companyId===existing.id) d.companyId=""; });
      deleteRecord("companies", existing.id);
      closeModal(); renderAll(); toast("Empresa eliminada");
    });
    document.getElementById("company-form").addEventListener("submit", function(e){
      e.preventDefault();
      var name = document.getElementById("c-name").value.trim();
      if(!name) return;
      var data = {
        name: name,
        industry: document.getElementById("c-industry").value.trim(),
        website: document.getElementById("c-website").value.trim(),
        notes: document.getElementById("c-notes").value.trim()
      };
      if(isEdit){ Object.assign(existing, data); pushRecord("companies","PUT",existing.id,existing); toast("Empresa actualizada"); }
      else { data.id = nextId("company"); data.createdAt = todayISO(); state.companies.push(data); pushRecord("companies","POST",null,data); toast("Empresa guardada"); }
      closeModal(); renderAll();
    });
  }

  function openDealModal(existing){
    var isEdit = !!existing;
    modalEl.innerHTML =
      '<h2>'+(isEdit?"Editar negocio":"Nuevo negocio")+'</h2>' +
      '<div class="modal-sub">Une un contacto o empresa a una oportunidad de venta.</div>' +
      '<form id="deal-form">' +
        '<div class="field"><label for="d-title">Título*</label><input id="d-title" required value="'+esc(existing?existing.title:"")+'" placeholder="Ej. Contrato anual de mantenimiento"></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="d-value">Valor (MXN)</label><input id="d-value" type="number" min="0" step="1" value="'+(existing?existing.value:"")+'" placeholder="50000"></div>' +
          '<div class="field"><label for="d-stage">Etapa</label><select id="d-stage">'+STAGES.map(function(s){return '<option value="'+s.key+'" '+(existing&&existing.stage===s.key?"selected":"")+'>'+esc(s.label)+'</option>';}).join("")+'</select></div>' +
        '</div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="d-company">Empresa</label><select id="d-company">'+companyOptions(existing?existing.companyId:"")+'</select></div>' +
          '<div class="field"><label for="d-contact">Contacto</label><select id="d-contact">'+contactOptions(existing?existing.contactId:"")+'</select></div>' +
        '</div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="d-next">Próximo paso</label><input id="d-next" value="'+esc(existing?existing.nextStep:"")+'" placeholder="Ej. Enviar propuesta"></div>' +
          '<div class="field"><label for="d-next-date">Fecha</label><input id="d-next-date" type="date" value="'+(existing?existing.nextStepDate||"":"")+'"></div>' +
        '</div>' +
        '<div class="modal-actions">' +
          '<div class="left">'+(isEdit?'<button type="button" class="btn btn-danger btn-sm" id="modal-del">Eliminar</button>':'')+'</div>' +
          '<div class="right"><button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button><button type="submit" class="btn btn-primary">Guardar</button></div>' +
        '</div>' +
      '</form>';
    backdrop.hidden = false;
    document.getElementById("d-title").focus();
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    if(isEdit) document.getElementById("modal-del").addEventListener("click", function(){
      state.deals = state.deals.filter(function(d){ return d.id!==existing.id; });
      deleteRecord("deals", existing.id);
      closeModal(); renderAll(); toast("Negocio eliminado");
    });
    document.getElementById("deal-form").addEventListener("submit", function(e){
      e.preventDefault();
      var title = document.getElementById("d-title").value.trim();
      if(!title) return;
      var data = {
        title: title,
        value: Number(document.getElementById("d-value").value)||0,
        stage: document.getElementById("d-stage").value,
        companyId: document.getElementById("d-company").value,
        contactId: document.getElementById("d-contact").value,
        nextStep: document.getElementById("d-next").value.trim(),
        nextStepDate: document.getElementById("d-next-date").value
      };
      if(isEdit){ Object.assign(existing, data); pushRecord("deals","PUT",existing.id,existing); toast("Negocio actualizado"); }
      else { data.id = nextId("deal"); data.createdAt = todayISO(); state.deals.push(data); pushRecord("deals","POST",null,data); toast("Negocio creado"); }
      closeModal(); renderAll();
    });
  }

  function openTaskModal(existing){
    var isEdit = !!existing;
    var pendingPhoto = (existing && existing.photo) ? existing.photo : null;

    modalEl.innerHTML =
      '<h2>'+(isEdit?"Editar tarea":"Nueva tarea")+'</h2>' +
      '<div class="modal-sub">Anota el próximo paso. Puedes asignarlo a uno o varios contactos y adjuntar una foto de evidencia.</div>' +
      '<form id="task-form">' +
        '<div class="field"><label for="t-title">Tarea*</label><input id="t-title" required value="'+esc(existing?existing.title:"")+'" placeholder="Ej. Entrega de muestrarios"></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="t-start-date">Fecha de inicio</label><input id="t-start-date" type="date" value="'+(existing?existing.startDate||"":"")+'"></div>' +
          '<div class="field"><label for="t-date">Fecha límite</label><input id="t-date" type="date" value="'+(existing?existing.dueDate||"":"")+'"></div>' +
        '</div>' +
        '<div class="field">' +
          '<label>Contactos asignados</label>' +
          '<div id="t-contacts-box">'+contactCheckboxList(existing?existing.relatedContactIds:[])+'</div>' +
        '</div>' +
        '<div class="field"><label for="t-notes">Comentarios</label><textarea id="t-notes" placeholder="Detalles, seguimiento, acuerdos…">'+esc(existing?existing.notes:"")+'</textarea></div>' +
        '<div class="field">' +
          '<label for="t-photo-input">Fotografía de evidencia</label>' +
          '<input type="file" id="t-photo-input" accept="image/*" capture="environment">' +
          '<div class="field-hint">Opcional — ej. comprobante de entrega. Se guarda dentro del archivo al Exportar datos.</div>' +
          '<div id="t-photo-preview"></div>' +
        '</div>' +
        '<div class="modal-actions">' +
          '<div class="left">'+(isEdit?'<button type="button" class="btn btn-danger btn-sm" id="modal-del">Eliminar</button>':'')+'</div>' +
          '<div class="right"><button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button><button type="submit" class="btn btn-primary">Guardar</button></div>' +
        '</div>' +
      '</form>';
    backdrop.hidden = false;
    document.getElementById("t-title").focus();
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    if(isEdit) document.getElementById("modal-del").addEventListener("click", function(){
      state.tasks = state.tasks.filter(function(t){ return t.id!==existing.id; });
      deleteRecord("tasks", existing.id);
      closeModal(); renderAll(); toast("Tarea eliminada");
    });

    function renderPhotoPreview(){
      var box = document.getElementById("t-photo-preview");
      if(!box) return;
      if(pendingPhoto){
        box.innerHTML = '<div class="photo-preview-wrap">' +
          '<img class="photo-preview-img" src="'+pendingPhoto+'" alt="Evidencia adjunta">' +
          '<button type="button" class="btn btn-secondary btn-sm" id="t-photo-remove-btn">Quitar foto</button>' +
        '</div>';
        document.getElementById("t-photo-remove-btn").addEventListener("click", function(){
          pendingPhoto = null;
          var inputEl = document.getElementById("t-photo-input");
          if(inputEl) inputEl.value = "";
          renderPhotoPreview();
        });
      } else {
        box.innerHTML = '<div class="field-hint">Sin fotografía adjunta.</div>';
      }
    }
    renderPhotoPreview();

    document.getElementById("t-photo-input").addEventListener("change", function(e){
      var file = e.target.files[0];
      if(!file) return;
      if(file.size > 8*1024*1024){ toast("La imagen es muy grande (máx. 8MB)."); e.target.value=""; return; }
      loadImageAsCompressedDataURL(file, 1280, 0.82).then(function(dataUrl){
        pendingPhoto = dataUrl;
        renderPhotoPreview();
      }).catch(function(){
        toast("No se pudo procesar esa imagen.");
      });
    });

    document.getElementById("task-form").addEventListener("submit", function(e){
      e.preventDefault();
      var title = document.getElementById("t-title").value.trim();
      if(!title) return;
      var checkedBoxes = document.querySelectorAll("#t-contacts-box input[type=checkbox]:checked");
      var relatedContactIds = Array.prototype.map.call(checkedBoxes, function(cb){ return cb.value; });
      var data = {
        title: title,
        startDate: document.getElementById("t-start-date").value,
        dueDate: document.getElementById("t-date").value,
        relatedContactIds: relatedContactIds,
        notes: document.getElementById("t-notes").value.trim(),
        photo: pendingPhoto
      };
      if(isEdit){ Object.assign(existing, data); pushRecord("tasks","PUT",existing.id,existing); toast("Tarea actualizada"); }
      else { data.id = nextId("task"); data.done = false; data.createdAt = todayISO(); state.tasks.push(data); pushRecord("tasks","POST",null,data); toast("Tarea guardada"); }
      closeModal(); renderAll();
    });
  }

  function openPaymentModal(existing){
    var isEdit = !!existing;
    var pendingPhoto = (existing && existing.photo) ? existing.photo : null;

    modalEl.innerHTML =
      '<h2>'+(isEdit?"Editar pago pendiente":"Nuevo pago pendiente")+'</h2>' +
      '<div class="modal-sub">Registra una factura por cobrar. Adjunta la foto como evidencia y asígnala a un contacto.</div>' +
      '<form id="payment-form">' +
        '<div class="field"><label for="p-desc">Descripción / Nota*</label><input id="p-desc" required value="'+esc(existing?existing.description:"")+'" placeholder="Ej. Factura #245"></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="p-amount">Monto (MXN)*</label><input id="p-amount" type="number" min="0" step="1" required value="'+(existing&&existing.amount?existing.amount:"")+'" placeholder="8500"></div>' +
          '<div class="field"><label for="p-purchase-date">Fecha de compra</label><input id="p-purchase-date" type="date" value="'+(existing?existing.purchaseDate||"":"")+'"></div>' +
        '</div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="p-contact-search">Contacto</label>' +
            '<div class="contact-picker">' +
              '<span class="search-icon">🔍</span>' +
              '<input type="text" id="p-contact-search" class="search-input" autocomplete="off" placeholder="Buscar contacto por nombre..." value="'+esc(existing&&existing.contactId?contactName(existing.contactId):"")+'">' +
              '<button type="button" class="contact-picker-clear" id="p-contact-clear" '+(existing&&existing.contactId?"":'hidden')+' title="Quitar contacto">✕</button>' +
              '<input type="hidden" id="p-contact" value="'+esc(existing?existing.contactId||"":"")+'">' +
              '<div class="contact-picker-list" id="p-contact-list" hidden></div>' +
            '</div>' +
          '</div>' +
          '<div class="field"><label for="p-status">Estado</label><select id="p-status">' +
            '<option value="pendiente" '+(!existing||existing.status!=="pagado"?"selected":"")+'>Pendiente</option>' +
            '<option value="pagado" '+(existing&&existing.status==="pagado"?"selected":"")+'>Pagado</option>' +
          '</select></div>' +
        '</div>' +
        '<div class="field"><label for="p-notes">Comentarios adicionales</label><textarea id="p-notes" placeholder="Notas, condiciones de pago, referencias…">'+esc(existing?existing.notes:"")+'</textarea></div>' +
        '<div class="field">' +
          '<label for="p-photo-input">Fotografía de la factura (evidencia)</label>' +
          '<input type="file" id="p-photo-input" accept="image/*" capture="environment">' +
          '<div class="field-hint">Opcional. Se guarda dentro del archivo al Exportar datos.</div>' +
          '<div id="p-photo-preview"></div>' +
        '</div>' +
        '<div class="modal-actions">' +
          '<div class="left">'+(isEdit?'<button type="button" class="btn btn-danger btn-sm" id="modal-del">Eliminar</button>':'')+'</div>' +
          '<div class="right"><button type="button" class="btn btn-secondary" id="modal-cancel">Cancelar</button><button type="submit" class="btn btn-primary">Guardar</button></div>' +
        '</div>' +
      '</form>';
    backdrop.hidden = false;
    document.getElementById("p-desc").focus();
    document.getElementById("modal-cancel").addEventListener("click", closeModal);
    if(isEdit) document.getElementById("modal-del").addEventListener("click", function(){
      state.payments = state.payments.filter(function(p){ return p.id!==existing.id; });
      deleteRecord("payments", existing.id);
      closeModal(); renderAll(); toast("Pago eliminado");
    });

    (function setupContactPicker(){
      var searchInput = document.getElementById("p-contact-search");
      var hiddenInput = document.getElementById("p-contact");
      var listBox = document.getElementById("p-contact-list");
      var clearBtn = document.getElementById("p-contact-clear");

      function selectContact(id){
        hiddenInput.value = id;
        searchInput.value = id ? contactName(id) : "";
        clearBtn.hidden = !id;
        closeList();
      }
      function closeList(){ listBox.hidden = true; listBox.innerHTML = ""; }
      function renderList(){
        var q = searchInput.value.trim().toLowerCase();
        var matches = sortedContacts().filter(function(c){
          return !q || contactFullName(c).toLowerCase().indexOf(q) !== -1;
        }).slice(0, 8);
        if(!matches.length){
          listBox.innerHTML = '<div class="contact-picker-empty">Sin contactos que coincidan.</div>';
        } else {
          listBox.innerHTML = matches.map(function(c){
            return '<div class="contact-picker-item" data-cid="'+c.id+'">'+esc(contactFullName(c))+'</div>';
          }).join("");
        }
        listBox.hidden = false;
      }
      searchInput.addEventListener("focus", renderList);
      searchInput.addEventListener("input", function(){
        if(hiddenInput.value && searchInput.value !== contactName(hiddenInput.value)){
          hiddenInput.value = ""; clearBtn.hidden = true;
        }
        renderList();
      });
      searchInput.addEventListener("blur", function(){
        setTimeout(function(){
          closeList();
          if(!hiddenInput.value) searchInput.value = "";
        }, 150);
      });
      listBox.addEventListener("mousedown", function(e){
        var item = e.target.closest("[data-cid]");
        if(!item) return;
        e.preventDefault();
        selectContact(item.getAttribute("data-cid"));
      });
      clearBtn.addEventListener("click", function(){ selectContact(""); searchInput.focus(); });
    })();

    function renderPhotoPreview(){
      var box = document.getElementById("p-photo-preview");
      if(!box) return;
      if(pendingPhoto){
        box.innerHTML = '<div class="photo-preview-wrap">' +
          '<img class="photo-preview-img" src="'+pendingPhoto+'" alt="Evidencia de factura">' +
          '<button type="button" class="btn btn-secondary btn-sm" id="p-photo-remove-btn">Quitar foto</button>' +
        '</div>';
        document.getElementById("p-photo-remove-btn").addEventListener("click", function(){
          pendingPhoto = null;
          var inputEl = document.getElementById("p-photo-input");
          if(inputEl) inputEl.value = "";
          renderPhotoPreview();
        });
      } else {
        box.innerHTML = '<div class="field-hint">Sin fotografía adjunta.</div>';
      }
    }
    renderPhotoPreview();

    document.getElementById("p-photo-input").addEventListener("change", function(e){
      var file = e.target.files[0];
      if(!file) return;
      if(file.size > 8*1024*1024){ toast("La imagen es muy grande (máx. 8MB)."); e.target.value=""; return; }
      loadImageAsCompressedDataURL(file, 1280, 0.82).then(function(dataUrl){
        pendingPhoto = dataUrl;
        renderPhotoPreview();
      }).catch(function(){
        toast("No se pudo procesar esa imagen.");
      });
    });

    document.getElementById("payment-form").addEventListener("submit", function(e){
      e.preventDefault();
      var description = document.getElementById("p-desc").value.trim();
      if(!description) return;
      var data = {
        description: description,
        amount: Number(document.getElementById("p-amount").value)||0,
        purchaseDate: document.getElementById("p-purchase-date").value,
        contactId: document.getElementById("p-contact").value,
        status: document.getElementById("p-status").value,
        notes: document.getElementById("p-notes").value.trim(),
        photo: pendingPhoto
      };
      if(isEdit){ Object.assign(existing, data); pushRecord("payments","PUT",existing.id,existing); toast("Pago actualizado"); }
      else { data.id = nextId("payment"); data.createdAt = todayISO(); state.payments.push(data); pushRecord("payments","POST",null,data); toast("Pago pendiente guardado"); }
      closeModal(); renderAll();
    });
  }

  /* ============ GLOBAL CLICK / CHANGE DELEGATION ============ */
  document.body.addEventListener("click", function(e){
    var t = e.target;

    if(t.id === "btn-new-contact") return openContactModal();
    if(t.id === "btn-new-company") return openCompanyModal();
    if(t.id === "btn-new-deal") return openDealModal();
    if(t.id === "btn-new-task") return openTaskModal();
    if(t.id === "btn-new-task-cal") return openTaskModal();
    if(t.id === "btn-new-payment") return openPaymentModal();
    if(t.id === "btn-sort-contacts"){ state.ui.sortContactsDesc = !state.ui.sortContactsDesc; renderContacts(); return; }
    if(t.id === "cal-prev"){ shiftCalendarMonth(-1); return; }
    if(t.id === "cal-next"){ shiftCalendarMonth(1); return; }
    if(t.id === "cal-today"){ jumpCalendarToToday(); return; }

    var editContact = t.closest("[data-edit-contact]");
    if(editContact){ e.stopPropagation(); return openContactModal(state.contacts.find(function(c){return c.id===editContact.getAttribute("data-edit-contact");})); }
    var delContact = t.closest("[data-del-contact]");
    if(delContact){ e.stopPropagation(); var delContactId=delContact.getAttribute("data-del-contact"); removeContactEverywhere(delContactId); deleteRecord("contacts", delContactId); renderAll(); toast("Contacto eliminado"); return; }
    var openContactRow = t.closest("[data-open-contact]");
    if(openContactRow){ return openContactModal(state.contacts.find(function(c){return c.id===openContactRow.getAttribute("data-open-contact");})); }

    var editCompany = t.closest("[data-edit-company]");
    if(editCompany){ e.stopPropagation(); return openCompanyModal(state.companies.find(function(c){return c.id===editCompany.getAttribute("data-edit-company");})); }
    var delCompany = t.closest("[data-del-company]");
    if(delCompany){ e.stopPropagation(); var coid=delCompany.getAttribute("data-del-company"); state.companies=state.companies.filter(function(c){return c.id!==coid;}); state.contacts.forEach(function(c){if(c.companyId===coid)c.companyId="";}); state.deals.forEach(function(d){if(d.companyId===coid)d.companyId="";}); deleteRecord("companies", coid); renderAll(); toast("Empresa eliminada"); return; }
    var openCompanyRow = t.closest("[data-open-company]");
    if(openCompanyRow){ return openCompanyModal(state.companies.find(function(c){return c.id===openCompanyRow.getAttribute("data-open-company");})); }

    var openDeal = t.closest("[data-open-deal]");
    if(openDeal){ return openDealModal(state.deals.find(function(d){return d.id===openDeal.getAttribute("data-open-deal");})); }

    var editTask = t.closest("[data-edit-task]");
    if(editTask){ e.stopPropagation(); return openTaskModal(state.tasks.find(function(x){return x.id===editTask.getAttribute("data-edit-task");})); }
    var delTask = t.closest("[data-del-task]");
    if(delTask){ e.stopPropagation(); var tid=delTask.getAttribute("data-del-task"); state.tasks=state.tasks.filter(function(x){return x.id!==tid;}); deleteRecord("tasks", tid); renderAll(); toast("Tarea eliminada"); return; }
    var viewTaskPhoto = t.closest("[data-view-task-photo]");
    if(viewTaskPhoto){
      e.stopPropagation();
      var taskWithPhoto = state.tasks.find(function(x){return x.id===viewTaskPhoto.getAttribute("data-view-task-photo");});
      if(taskWithPhoto && taskWithPhoto.photo) openLightbox(taskWithPhoto.photo);
      return;
    }

    var editPayment = t.closest("[data-edit-payment]");
    if(editPayment){ e.stopPropagation(); return openPaymentModal(state.payments.find(function(x){return x.id===editPayment.getAttribute("data-edit-payment");})); }
    var delPayment = t.closest("[data-del-payment]");
    if(delPayment){ e.stopPropagation(); var pid=delPayment.getAttribute("data-del-payment"); state.payments=state.payments.filter(function(x){return x.id!==pid;}); deleteRecord("payments", pid); renderAll(); toast("Pago eliminado"); return; }
    var viewPaymentPhoto = t.closest("[data-view-payment-photo]");
    if(viewPaymentPhoto){
      e.stopPropagation();
      var paymentWithPhoto = state.payments.find(function(x){return x.id===viewPaymentPhoto.getAttribute("data-view-payment-photo");});
      if(paymentWithPhoto && paymentWithPhoto.photo) openLightbox(paymentWithPhoto.photo);
      return;
    }
  });

  document.body.addEventListener("change", function(e){
    var t = e.target;
    if(t.matches("[data-toggle-task]")){
      var id = t.getAttribute("data-toggle-task");
      var task = state.tasks.find(function(x){ return x.id===id; });
      if(task){ task.done = t.checked; pushRecord("tasks","PUT",task.id,task); renderAll(); }
      return;
    }
    if(t.matches("[data-move-deal]")){
      moveDealStage(t.getAttribute("data-move-deal"), t.value);
      return;
    }
    if(t.matches("[data-toggle-payment]")){
      var pid2 = t.getAttribute("data-toggle-payment");
      var payment = state.payments.find(function(x){ return x.id===pid2; });
      if(payment){ payment.status = t.checked ? "pagado" : "pendiente"; pushRecord("payments","PUT",payment.id,payment); renderAll(); }
      return;
    }
    if(t.id === "search-contacts"){ state.ui.searchContacts = t.value; renderContacts(); return; }
    if(t.id === "search-companies"){ state.ui.searchCompanies = t.value; renderCompanies(); return; }
    if(t.id === "search-payments"){ state.ui.searchPayments = t.value; renderPayments(); return; }
    if(t.id === "filter-contact-company"){ state.ui.filterContactCompany = t.value; renderContacts(); return; }
    if(t.id === "filter-contact-city"){ state.ui.filterContactCity = t.value; renderContacts(); return; }
  });
  document.body.addEventListener("input", function(e){
    if(e.target.id === "search-contacts"){ state.ui.searchContacts = e.target.value; renderContacts(); }
    if(e.target.id === "search-companies"){ state.ui.searchCompanies = e.target.value; renderCompanies(); }
    if(e.target.id === "search-payments"){ state.ui.searchPayments = e.target.value; renderPayments(); }
  });

  /* ============ EXPORT / IMPORT ============ */
  document.getElementById("btn-export").addEventListener("click", function(){
    var payload = {
      contacts: state.contacts, companies: state.companies, deals: state.deals, tasks: state.tasks, payments: state.payments,
      exportedAt: new Date().toISOString(), source: "Bitácora CRM"
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "bitacora-crm-" + todayISO() + ".json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast("Datos exportados");
  });
  document.getElementById("btn-import").addEventListener("click", function(){
    document.getElementById("import-file-input").click();
  });
  document.getElementById("import-file-input").addEventListener("change", function(e){
    var file = e.target.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      try{
        var data = JSON.parse(reader.result);
        if(!data || typeof data !== "object") throw new Error("formato inválido");
        var ok = confirm("Esto reemplazará los datos actuales de la Bitácora con los del archivo importado. ¿Continuar?");
        if(!ok) return;
        state.contacts = (Array.isArray(data.contacts) ? data.contacts : []).map(migrateContact);
        state.companies = Array.isArray(data.companies) ? data.companies : [];
        state.deals = Array.isArray(data.deals) ? data.deals : [];
        state.tasks = Array.isArray(data.tasks) ? data.tasks : [];
        state.payments = (Array.isArray(data.payments) ? data.payments : []).map(migratePayment);
        renderAll();
        toast("Datos importados");
      }catch(err){
        toast("No se pudo leer el archivo: revisa que sea un JSON exportado desde aquí.");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  });

  /* ============ SEED (solo en modo autónomo, sin servidor) ============ */
  function startStandalone(){
    state.tasks.push({
      id: nextId("task"),
      title: "Entrega de muestrarios",
      done: false,
      startDate: "",
      dueDate: "",
      relatedContactIds: [],
      notes: "",
      photo: null,
      createdAt: todayISO()
    });
    renderAll();
  }

  /* ============ INIT ============ */
  initConnectedMode();
})();
</script>
</body>
</html>
