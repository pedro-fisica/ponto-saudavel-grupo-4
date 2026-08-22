/* =============================================================================
   PONTO SAUDÁVEL — Controle de Acessibilidade: Tamanho de Fonte
   Permite aumentar, diminuir e redefinir o tamanho do texto da aplicação,
   salvando a preferência do usuário no localStorage.
============================================================================= */
(function () {
  'use strict';

  // Constantes de configuração
  var MIN_SCALE = 80;      // 80% do tamanho base
  var MAX_SCALE = 150;     // 150% do tamanho base
  var STEP = 10;           // Alteração de 10% por clique
  var DEFAULT_SCALE = 100; // 100% tamanho normal
  var STORAGE_KEY = 'ponto_saudavel_font_scale';

  /**
   * Aplica a escala de fonte no elemento <html> (root).
   * Como o CSS do projeto utiliza unidades `rem`, alterar o font-size do <html>
   * escala proporcionalmente todos os textos da página.
   */
  function applyFontScale(scale) {
    if (scale === DEFAULT_SCALE) {
      document.documentElement.style.fontSize = '';
    } else {
      document.documentElement.style.fontSize = scale + '%';
    }

    try {
      localStorage.setItem(STORAGE_KEY, scale.toString());
    } catch (e) {
      // Ignora falhas de armazenamento (ex: navegação privada estrita)
    }
  }

  /**
   * Recupera a preferência de tamanho de fonte salva anteriormente no localStorage.
   */
  function getSavedScale() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var val = parseInt(saved, 10);
        if (!isNaN(val) && val >= MIN_SCALE && val <= MAX_SCALE) {
          return val;
        }
      }
    } catch (e) {}
    return DEFAULT_SCALE;
  }

  var currentScale = getSavedScale();

  // Aplica a escala salva imediatamente para evitar piscada de tela (FOUC)
  applyFontScale(currentScale);

  // Associa os eventos de clique quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function () {
    var btnDecrease = document.getElementById('btn-font-decrease');
    var btnReset = document.getElementById('btn-font-reset');
    var btnIncrease = document.getElementById('btn-font-increase');

    if (btnDecrease) {
      btnDecrease.addEventListener('click', function () {
        if (currentScale > MIN_SCALE) {
          currentScale = Math.max(MIN_SCALE, currentScale - STEP);
          applyFontScale(currentScale);
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', function () {
        currentScale = DEFAULT_SCALE;
        applyFontScale(currentScale);
      });
    }

    if (btnIncrease) {
      btnIncrease.addEventListener('click', function () {
        if (currentScale < MAX_SCALE) {
          currentScale = Math.min(MAX_SCALE, currentScale + STEP);
          applyFontScale(currentScale);
        }
      });
    }
  });
})();
