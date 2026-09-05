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

    // Funcionalidade de salvar receita com feedback acessível
    var btnSalvarReceita = document.querySelector('.btn-salvar-receita');
    if (btnSalvarReceita) {
      btnSalvarReceita.addEventListener('click', function () {
        // Alterna o estado salvo/não salvo
        var estaSalva = btnSalvarReceita.classList.contains('salvo');

        if (!estaSalva) {
          // Marca como salva
          btnSalvarReceita.classList.add('salvo');
          btnSalvarReceita.querySelector('span').textContent = '♥'; // Coração cheio
          
          // Anuncia para leitores de tela
          var anuncio = document.getElementById('feedback-salvo');
          if (anuncio) {
            anuncio.textContent = 'Receita salva com sucesso!';
          }

          // Remove a mensagem após 4 segundos
          setTimeout(function () {
            if (anuncio) {
              anuncio.textContent = '';
            }
          }, 4000);
        } else {
          // Remove do salvos
          btnSalvarReceita.classList.remove('salvo');
          btnSalvarReceita.querySelector('span').textContent = '♡'; // Coração vazio
          
          var anuncio = document.getElementById('feedback-salvo');
          if (anuncio) {
            anuncio.textContent = 'Receita removida dos salvos.';
          }

          setTimeout(function () {
            if (anuncio) {
              anuncio.textContent = '';
            }
          }, 4000);
        }
      });
    }

    // Funcionalidade de favoritar receita nos cards (receitas.html)
    var btnsFavoritar = document.querySelectorAll('.btn-favoritar');
    btnsFavoritar.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        
        // Obtém o nome da receita do aria-label do botão
        var ariaLabel = btn.getAttribute('aria-label') || '';
        var nomeReceita = ariaLabel.replace('Favoritar ', '').replace('Remover dos favoritos ', '');
        
        // Alterna o estado
        var isFavorited = btn.getAttribute('aria-pressed') === 'true';

        if (!isFavorited) {
          // Marca como favoritado
          btn.classList.add('favoritado');
          btn.setAttribute('aria-pressed', 'true');
          btn.querySelector('span').textContent = '♥'; // Coração cheio
          
          // Anuncia para leitores de tela
          var anuncio = document.getElementById('feedback-salvo');
          if (anuncio) {
            anuncio.textContent = nomeReceita + ' adicionado aos favoritos!';
          }

          // Remove a mensagem após 4 segundos
          setTimeout(function () {
            if (anuncio) {
              anuncio.textContent = '';
            }
          }, 4000);
        } else {
          // Remove dos favoritos
          btn.classList.remove('favoritado');
          btn.setAttribute('aria-pressed', 'false');
          btn.querySelector('span').textContent = '♡'; // Coração vazio
          
          var anuncio = document.getElementById('feedback-salvo');
          if (anuncio) {
            anuncio.textContent = nomeReceita + ' removido dos favoritos.';
          }

          setTimeout(function () {
            if (anuncio) {
              anuncio.textContent = '';
            }
          }, 4000);
        }
      });
    });

    // ========================================================================
    // Funcionalidade de filtros de receitas (Sem Glúten, Sem Lactose)
    // ========================================================================
    var filtrosButtons = document.querySelectorAll('.filtro-receita');
    var receitasCards = document.querySelectorAll('.receita-card[data-filtros]');

    // Rastreia os filtros ativos
    var filtrosAtivos = {};

    filtrosButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filtro = btn.getAttribute('data-filtro');
        var estaPressionado = btn.getAttribute('aria-pressed') === 'true';

        // Alterna o estado do filtro
        if (!estaPressionado) {
          btn.classList.add('pill--ativo');
          btn.setAttribute('aria-pressed', 'true');
          filtrosAtivos[filtro] = true;
        } else {
          btn.classList.remove('pill--ativo');
          btn.setAttribute('aria-pressed', 'false');
          delete filtrosAtivos[filtro];
        }

        // Aplica os filtros aos cards
        atualizarVisibilidadeReceitas();
      });
    });

    /**
     * Atualiza a visibilidade dos cards de receita com base nos filtros selecionados.
     * Se há filtros ativos, exibe apenas as receitas que atendem a TODOS os filtros.
     * Se não há filtros ativos, exibe todas as receitas.
     */
    function atualizarVisibilidadeReceitas() {
      var filtrosArray = Object.keys(filtrosAtivos);
      var temFiltrosAtivos = filtrosArray.length > 0;

      receitasCards.forEach(function (card) {
        if (!temFiltrosAtivos) {
          // Sem filtros ativos: exibe todas as receitas
          card.style.display = '';
        } else {
          // Com filtros ativos: exibe apenas se atende a TODOS os filtros
          var filtrosReceita = card.getAttribute('data-filtros')
            .split(',')
            .map(function (f) { return f.trim(); });

          var atendeTodosFiltros = filtrosArray.every(function (filtro) {
            return filtrosReceita.indexOf(filtro) !== -1;
          });

          card.style.display = atendeTodosFiltros ? '' : 'none';
        }
      });
    }
  });
})();
