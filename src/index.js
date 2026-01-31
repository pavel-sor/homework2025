!(function () {
  let s = document.getElementById("tasks"),
    y = document.getElementById("tasks2"),
    e = document.getElementById("diplom"),
    t = document.getElementById("tasksBlock"),
    p = document.getElementById("tasksBlock2"),
    l = document.getElementById("diplomBlock"),
    i = document.getElementById("burger"),
    o = document.getElementById("sidebar"),
    c = document.getElementById("overlay"),
    d = document.getElementById("body");

  // Инициализация - скрываем второй блок
  p.classList.add("hidden");

  ((s.onclick = function () {
    (e.classList.remove("active"),
      y.classList.remove("active"),
      this.classList.add("active"),
      t.classList.remove("hidden"),
      p.classList.add("hidden"), // Добавлено: скрываем второй блок
      l.classList.add("hidden"),
      o.classList.remove("show"),
      c.classList.remove("show"));
  }),
    (y.onclick = function () { // Добавлено: обработка для второй кнопки
      (s.classList.remove("active"),
        e.classList.remove("active"),
        this.classList.add("active"),
        p.classList.remove("hidden"), // Показываем второй блок
        t.classList.add("hidden"), // Скрываем первый блок
        l.classList.add("hidden"),
        o.classList.remove("show"),
        c.classList.remove("show"));
    }),
    (e.onclick = function () {
      (s.classList.remove("active"),
        y.classList.remove("active"), // Добавлено: снимаем активность с tasks2
        this.classList.add("active"),
        l.classList.remove("hidden"),
        t.classList.add("hidden"),
        p.classList.add("hidden"), // Добавлено: скрываем второй блок
        o.classList.remove("show"),
        c.classList.remove("show"));
    }),
    (i.onclick = function () {
      (d.classList.toggle("overflow"),
        c.classList.toggle("show"),
        o.classList.toggle("show"));
    }));
})();
