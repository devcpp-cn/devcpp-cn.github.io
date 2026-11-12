/* Dev-C++ 中文站 · 交互脚本 */
(function () {
	"use strict";

	/* 顶栏滚动阴影 */
	var topbar = document.querySelector(".topbar");
	function onScroll() {
		if (!topbar) return;
		topbar.classList.toggle("is-stuck", window.scrollY > 8);
		var toTop = document.querySelector(".to-top");
		if (toTop) toTop.classList.toggle("is-on", window.scrollY > 600);
	}
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();

	/* 移动端菜单 */
	var burger = document.querySelector(".burger");
	var mobnav = document.querySelector(".mobnav");
	if (burger && mobnav) {
		burger.addEventListener("click", function () {
			mobnav.classList.toggle("is-open");
			burger.setAttribute("aria-expanded", mobnav.classList.contains("is-open") ? "true" : "false");
		});
		mobnav.querySelectorAll("a").forEach(function (a) {
			a.addEventListener("click", function () {
				mobnav.classList.remove("is-open");
				burger.setAttribute("aria-expanded", "false");
			});
		});
	}

	/* FAQ 手风琴 */
	document.querySelectorAll(".faq__item").forEach(function (item) {
		var btn = item.querySelector(".faq__q");
		var panel = item.querySelector(".faq__a");
		if (!btn || !panel) return;
		btn.addEventListener("click", function () {
			var open = item.classList.contains("is-open");
			if (open) {
				panel.style.maxHeight = "0px";
				item.classList.remove("is-open");
				btn.setAttribute("aria-expanded", "false");
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
				item.classList.add("is-open");
				btn.setAttribute("aria-expanded", "true");
			}
		});
	});

	/* 首项默认展开（带 data-open 的项） */
	document.querySelectorAll('.faq__item[data-open="1"]').forEach(function (item) {
		var btn = item.querySelector(".faq__q");
		var panel = item.querySelector(".faq__a");
		if (!btn || !panel) return;
		item.classList.add("is-open");
		btn.setAttribute("aria-expanded", "true");
		panel.style.maxHeight = panel.scrollHeight + "px";
	});

	/* 淡入 */
	var reveals = document.querySelectorAll(".reveal");
	if ("IntersectionObserver" in window && reveals.length) {
		var io = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						e.target.classList.add("is-in");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
		);
		reveals.forEach(function (el) { io.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add("is-in"); });
	}

	/* 返回顶部 */
	var toTopBtn = document.querySelector(".to-top");
	if (toTopBtn) {
		toTopBtn.addEventListener("click", function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	/* 教程页目录高亮 */
	var tocLinks = document.querySelectorAll(".toc a[href^='#']");
	if (tocLinks.length && "IntersectionObserver" in window) {
		var map = {};
		tocLinks.forEach(function (a) {
			var id = a.getAttribute("href").slice(1);
			var sec = document.getElementById(id);
			if (sec) map[id] = a;
		});
		var spy = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (e) {
					if (e.isIntersecting) {
						tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
						var link = map[e.target.id];
						if (link) link.classList.add("is-active");
					}
				});
			},
			{ rootMargin: "-15% 0px -70% 0px" }
		);
		Object.keys(map).forEach(function (id) {
			var el = document.getElementById(id);
			if (el) spy.observe(el);
		});
	}
})();
