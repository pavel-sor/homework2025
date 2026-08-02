const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const form = document.getElementById("leadForm");
const formMsg = document.getElementById("formMsg");

if (form && formMsg) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();

    if (!name || !contact) {
      formMsg.textContent = "Заполните, пожалуйста, оба поля.";
      return;
    }

    formMsg.textContent = "Заявка отправлена. Я свяжусь с вами в ближайшее время.";
    form.reset();
  });
}

const quizForm = document.getElementById("levelQuiz");
const quizResult = document.getElementById("quizResult");
const quizLevel = document.getElementById("quizLevel");
const quizReadiness = document.getElementById("quizReadiness");
const quizAdvice = document.getElementById("quizAdvice");

if (quizForm && quizResult && quizLevel && quizReadiness && quizAdvice) {
  const questionNames = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let totalScore = 0;
    let readinessScore = 0;
    let answered = 0;

    questionNames.forEach((name) => {
      const selected = quizForm.querySelector(`input[name="${name}"]:checked`);
      if (selected) {
        answered += 1;
        totalScore += Number(selected.value);
        readinessScore += Number(selected.dataset.ready || 0);
      }
    });

    if (answered !== questionNames.length) {
      quizResult.hidden = false;
      quizLevel.textContent = "Уровень: заполните все вопросы";
      quizReadiness.textContent = "Готовность к ОГЭ: не определена";
      quizAdvice.textContent = "Выберите по одному варианту в каждом вопросе, чтобы получить точный результат.";
      return;
    }

    let levelText = "A1 (базовый)";
    if (totalScore >= 13) {
      levelText = "B1-B2 (уверенный)";
    } else if (totalScore >= 9) {
      levelText = "A2-B1 (средний)";
    } else if (totalScore >= 6) {
      levelText = "A2 (ниже среднего)";
    }

    let readinessText = "Низкая";
    let adviceText = "Стоит начать с базы: грамматика + словарь + регулярный учебный ритм 2-3 раза в неделю.";
    if (readinessScore >= 11) {
      readinessText = "Высокая";
      adviceText = "Можно переходить к интенсивной отработке формата ОГЭ: тайминг, письмо и тренировочные варианты.";
    } else if (readinessScore >= 7) {
      readinessText = "Средняя";
      adviceText = "Хорошая основа. Рекомендую добавить больше заданий в формате ОГЭ и практику на время.";
    }

    quizResult.hidden = false;
    quizLevel.textContent = `Уровень: ${levelText}`;
    quizReadiness.textContent = `Готовность к ОГЭ: ${readinessText}`;
    quizAdvice.textContent = `Баллы: ${totalScore}/16. ${adviceText}`;
  });

  quizForm.addEventListener("reset", () => {
    quizResult.hidden = true;
    quizLevel.textContent = "Уровень: —";
    quizReadiness.textContent = "Готовность к ОГЭ: —";
    quizAdvice.textContent = "Рекомендация появится после прохождения теста.";
  });
}


document.addEventListener("DOMContentLoaded", function () {
    // Получаем сумму из URL параметра
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount");
    const plan = urlParams.get("plan") || "База";

    if (amount) {
      document.getElementById("displayAmount").innerHTML =
        amount + ' <span>₽</span>';
    }

    // Форматирование номера карты
    const cardInput = document.getElementById("cardNumber");
    cardInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");
      let formatted = "";
      for (let i = 0; i < value.length && i < 16; i++) {
        if (i > 0 && i % 4 === 0) formatted += " ";
        formatted += value[i];
      }
      this.value = formatted;
      updateCardIcons(value);
    });

    // Форматирование срока действия
    const expiryInput = document.getElementById("cardExpiry");
    expiryInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");
      if (value.length >= 2) {
        this.value = value.slice(0, 2) + " / " + value.slice(2, 4);
      } else {
        this.value = value;
      }
    });

    // Ограничение на ввод CVV только цифрами
    const cvvInput = document.getElementById("cardCvv");
    cvvInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "");
    });

    // Переключение способов оплаты
    document.querySelectorAll('input[name="method"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        document.querySelectorAll(".payment-method").forEach((el) => {
          el.classList.toggle("selected", el.querySelector('input[type="radio"]') === this);
        });

        const cardFields = document.getElementById("cardFields");
        const sbpFields = document.getElementById("sbpFields");

        if (this.value === "card") {
          cardFields.style.display = "block";
          sbpFields.style.display = "none";
        } else {
          cardFields.style.display = "none";
          sbpFields.style.display = "block";
        }
      });
    });

    // Обновление иконок карт
    function updateCardIcons(value) {
      const firstDigit = value.charAt(0);
      const visaIcon = document.getElementById("visaIcon");
      const mcIcon = document.getElementById("mcIcon");
      const mirIcon = document.getElementById("mirIcon");

      visaIcon.style.opacity = firstDigit === "4" ? "1" : "0.4";
      mcIcon.style.opacity =
        firstDigit === "5" || firstDigit === "2" ? "1" : "0.4";
      mirIcon.style.opacity = firstDigit === "2" ? "1" : "0.4";
    }

    // Обработка отправки формы
    document
      .getElementById("paymentForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        const method = document.querySelector(
          'input[name="method"]:checked'
        ).value;
        const loadingOverlay = document.getElementById("loadingOverlay");
        const payBtn = document.getElementById("payBtn");

        // Базовая валидация
        if (method === "card") {
          const cardNum = document
            .getElementById("cardNumber")
            .value.replace(/\s/g, "");
          const expiry = document.getElementById("cardExpiry").value;
          const cvv = document.getElementById("cardCvv").value;

          if (cardNum.length < 16) {
            alert("Пожалуйста, введите полный номер карты.");
            return;
          }

          if (expiry.length < 7) {
            alert("Пожалуйста, введите срок действия карты.");
            return;
          }

          if (cvv.length < 3) {
            alert("Пожалуйста, введите CVV-код.");
            return;
          }
        } else {
          const phone = document.getElementById("sbpPhone").value;
          if (phone.length < 10) {
            alert("Пожалуйста, введите корректный номер телефона.");
            return;
          }
        }

        // Имитация отправки платежа
        payBtn.disabled = true;
        loadingOverlay.classList.add("active");

        // Эмуляция запроса к API Альфа-Банка
        setTimeout(function () {
          loadingOverlay.classList.remove("active");

          // Успешная оплата
          const success = Math.random() > 0.1;

          if (success) {
            alert(
              "✅ Оплата успешно прошла!\nСпасибо за доверие. Я свяжусь с вами в ближайшее время."
            );
            window.location.href = "index.html";
          } else {
            alert(
              "❌ Произошла ошибка при оплате.\nПопробуйте еще раз или выберите другой способ оплаты."
            );
            payBtn.disabled = false;
          }
        }, 2500);
      });
  });