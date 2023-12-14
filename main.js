(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"637888a1-9ced-4570-b92f-3c1ad708077b","Content-Type":"application/json"}};function t(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST";return fetch("".concat(e.baseUrl).concat(t),{method:o,headers:e.headers,body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){return console.log(e),e}))}var n=document.querySelector("#card-template").content.querySelector(".places__item");function o(e,t,o,r,u){var a=n.cloneNode(!0),i=a.querySelector(".card__delete-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__title"),d=a.querySelector(".card__like-button"),p=a.querySelector(".card__like-count");return l.src=e.link,s.alt=e.name,s.textContent=e.name,p.textContent=e.likes.length,l.addEventListener("click",(function(){return o(e)})),d.addEventListener("click",(function(){return r(e,u,a)})),a.id=e._id,e.owner&&u!==e.owner._id?i.remove():i.addEventListener("click",(function(){t(e)})),c(e,u)?d.classList.add("card__like-button_is-active"):d.classList.remove("card__like-button_is-active"),a}function r(e,n,o){var r,u=o.querySelector(".card__like-button"),a=o.querySelector(".card__like-count");c(e,n)?(r=e,t("/cards/likes/".concat(r._id),{},"DELETE")).then((function(t){a.textContent=t.likes.length,u.classList.remove("card__like-button_is-active"),e.likes=t.likes})).catch((function(e){return console.log(e)})):function(e){return t("/cards/likes/".concat(e._id),{},"PUT")}(e).then((function(t){a.textContent=t.likes.length,u.classList.add("card__like-button_is-active"),e.likes=t.likes})).catch((function(e){return console.log(e)}))}function c(e,t){return e.likes.some((function(e){return e._id===t}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.code&&a(document.querySelector(".popup_is-opened"))}var l=function(e){return e.some((function(e){return!e.validity.valid}))};function s(e,t,n){var o=n.inputErrorClass,r=n.errorClass,c=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),c.classList.remove(r),c.textContent=""}function d(e,t,n){l(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,o,t)}var _=document.querySelector(".places__list"),f=document.querySelector(".profile__edit-button"),m=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__image"),y=document.querySelector(".popup__avatar"),S=document.getElementById("link-avatar-input"),h=document.querySelector(".popup_delete-image"),q=h.querySelector(".popup__button"),b=y.querySelector(".popup__button"),g=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),E=k.querySelector(".popup__image"),C=document.querySelector(".popup__caption"),L=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),T=document.querySelector(".popup_type_edit"),A=T.querySelector(".popup__button"),B=T.querySelector(".popup__form"),D=B.querySelector(".popup__input_type_name"),w=B.querySelector(".popup__input_type_description"),I=document.querySelectorAll(".popup"),P=g.querySelector(".popup__button"),U=g.querySelector(".popup__input_type_card-name"),j=g.querySelector(".popup__input_type_url"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function G(e){u(h),q.dataset.cardId=e._id}function H(e){E.alt=e.name,C.textContent=e.name,E.src=e.link,u(k)}function N(e,t){t.textContent=e?"Сохранение...":t.dataset.buttonText}I.forEach((function(e){e.addEventListener("mouseup",(function(t){var n=t.target,o=t.currentTarget;(n.classList.contains("popup__close")||n===o)&&a(e)}))})),Promise.all([("/users/me",fetch("".concat(e.baseUrl).concat("/users/me"),{method:"GET",headers:e.headers}).then((function(e){return e.json()})).then((function(e){return console.log(e),e}))),fetch("".concat(e.baseUrl).concat("/cards"),{method:"GET",headers:e.headers}).then((function(e){return e.json()})).then((function(e){return console.log(e),e}))]).then((function(e){console.log(e);var t=e[0],n=e[1].filter((function(e){return e.owner._id===t._id}));L.textContent=e[0].name,x.textContent=e[0].about,v.style="background-image: url('".concat(e[0].avatar,"')"),n.forEach((function(e){return _.append(o(e,G,H,r,t._id))}))})).catch((function(e){return console.log(e)})),f.addEventListener("click",(function(){D.value=L.textContent,w.value=x.textContent,p(T,M),u(T)})),m.addEventListener("click",(function(){p(g,M),u(g)})),v.addEventListener("click",(function(){p(y,M),S.value="",u(y)})),g.addEventListener("submit",(function(e){var n,c;e.preventDefault(),N(!0,P),(n=U.value,c=j.value,t("/cards",{name:n,link:c})).then((function(e){_.append(o(e,G,H,r,ID))})).catch((function(e){return console.log(e)})).finally((function(){N(!1,P),a(g)})),g.querySelector(".popup__form").reset()})),B.addEventListener("submit",(function(e){e.preventDefault(),N(!0,A),L.textContent=D.value,x.textContent=w.value,function(e,n){return t("/users/me",{name:e,about:n},"PATCH")}(D.value,w.value).then((function(e){e&&e.name&&e.about&&(L.textContent=e.name,x.textContent=e.about)})).catch((function(e){return console.log(e)})).finally((function(){N(!1,A),a(T)}))})),y.addEventListener("submit",(function(e){var n;e.preventDefault(),N(!0,b),(n=S.value,t("/users/me/avatar",{avatar:n},"PATCH")).then((function(e){v.style="background-image: url('".concat(e.avatar,"')")})).catch((function(e){return console.log(e)})).finally((function(){N(!1,b),a(y)}))})),q.addEventListener("click",(function(e){e.preventDefault(),N(!0,q);var n,o=q.dataset.cardId;console.log("Card ID to delete:",o),(n=o,t("/cards/".concat(n),{},"DELETE")).then((function(){console.log("Card successfully deleted from server");var e=document.getElementById(o);e&&(e.remove(),q.dataset.cardId="",N(!1,q),a(h))})).catch((function(e){return console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,o){var r=o.inputErrorClass,c=o.errorClass,u=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),u.classList.add(c),u.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}(M)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBZVgsRUFBV1ksRUFBUUMsRUFDcEMsR0FDRixHQUNGLENBd0JJd0UsQ0FBa0JoRixFQUFhUSxFQUNqQyxHQUNGLENDMkdBeUUsQ0FBaUJ6RSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzdG8tcHJvamVjdC1mZi8uL3NyYy9jb21wb25lbnRzL2FwaS5qcyIsIndlYnBhY2s6Ly9tZXN0by1wcm9qZWN0LWZmLy4vc3JjL2NvbXBvbmVudHMvY2FyZC5qcyIsIndlYnBhY2s6Ly9tZXN0by1wcm9qZWN0LWZmLy4vc3JjL2NvbXBvbmVudHMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vbWVzdG8tcHJvamVjdC1mZi8uL3NyYy9jb21wb25lbnRzL3ZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vbWVzdG8tcHJvamVjdC1mZi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb25maWcgPSB7XHJcbiAgYmFzZVVybDogJ2h0dHBzOi8vbm9tb3JlcGFydGllcy5jby92MS93ZmYtY29ob3J0LTInLFxyXG4gIGhlYWRlcnM6IHtcclxuICAgIGF1dGhvcml6YXRpb246ICc2Mzc4ODhhMS05Y2VkLTQ1NzAtYjkyZi0zYzFhZDcwODA3N2InLFxyXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEluZm8oZGF0YSkge1xyXG4gIHJldHVybiBmZXRjaChgJHtjb25maWcuYmFzZVVybH0ke2RhdGF9YCwge1xyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVyczogY29uZmlnLmhlYWRlcnMsXHJcbiAgfSlcclxuICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAudGhlbihyZXMgPT4ge1xyXG4gICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgIHJldHVybiByZXM7XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhcmRzKGRhdGEpIHtcclxuICByZXR1cm4gZmV0Y2goYCR7Y29uZmlnLmJhc2VVcmx9JHtkYXRhfWAsIHtcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnM6IGNvbmZpZy5oZWFkZXJzLFxyXG4gIH0pXHJcbiAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgLnRoZW4ocmVzID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICByZXR1cm4gcmVzO1xyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXNlcnMsIGRhdGEsIG1ldGhvZCA9IFwiUE9TVFwiKSB7XHJcbiAgcmV0dXJuIGZldGNoKGAke2NvbmZpZy5iYXNlVXJsfSR7dXNlcnN9YCwge1xyXG4gICAgbWV0aG9kLFxyXG4gICAgaGVhZGVyczogY29uZmlnLmhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICB9KVxyXG4gIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gIC50aGVuKHJlcyA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9DaGFuZ2VOYW1lcyhpbnB1dE5hbWUsIGlucHV0RGVzY3JpcHRpb24pIHtcclxuICByZXR1cm4gcG9zdChcIi91c2Vycy9tZVwiLCB7IG5hbWU6IGlucHV0TmFtZSwgYWJvdXQ6IGlucHV0RGVzY3JpcHRpb259LCBcIlBBVENIXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9DaGFuZ2VBdmF0YXIoYXZhdGFyTGluaykge1xyXG4gIHJldHVybiBwb3N0KFwiL3VzZXJzL21lL2F2YXRhclwiLCB7IGF2YXRhcjogYXZhdGFyTGluayB9LCBcIlBBVENIXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2FyZHMoZGF0YU5hbWUsIGRhdGFMaW5rKSB7XHJcbiAgcmV0dXJuIHBvc3QoXCIvY2FyZHNcIiwgeyBuYW1lOiBkYXRhTmFtZSwgbGluazogZGF0YUxpbmt9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNhcmRzKGNhcmRJZCkge1xyXG4gIHJldHVybiBwb3N0KGAvY2FyZHMvJHtjYXJkSWR9YCwge30sIFwiREVMRVRFXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTGlrZShkYXRhKSB7XHJcbiAgcmV0dXJuIHBvc3QoYC9jYXJkcy9saWtlcy8ke2RhdGFbJ19pZCddfWAsIHt9LCBcIkRFTEVURVwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpa2UoZGF0YSkge1xyXG4gIHJldHVybiBwb3N0KGAvY2FyZHMvbGlrZXMvJHtkYXRhWydfaWQnXX1gLCB7fSwgXCJQVVRcIik7XHJcbn0iLCJpbXBvcnQgeyBhZGRMaWtlLCBkZWxldGVMaWtlIH0gZnJvbSBcIi4vYXBpXCI7XHJcbmV4cG9ydCB7IGNyZWF0ZUNhcmQsIGhhbmRsZUxpa2UgfTtcclxuXHJcbmNvbnN0IGNhcmRUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJkLXRlbXBsYXRlJykuY29udGVudC5xdWVyeVNlbGVjdG9yKCcucGxhY2VzX19pdGVtJyk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGRhdGEsIHJlbW92ZUNhcmQsIG9wZW5JbWcsIGhhbmRsZUxpa2UsIElEKSB7XHJcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjYXJkVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xyXG4gIGNvbnN0IGNhcmREZWxldGVCdXR0b24gPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fZGVsZXRlLWJ1dHRvbicpO1xyXG4gIGNvbnN0IGNhcmRJbWFnZSA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19pbWFnZScpO1xyXG4gIGNvbnN0IGNhcmRUaXRsZSA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX190aXRsZScpO1xyXG4gIGNvbnN0IGNhcmRMaWtlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX2xpa2UtYnV0dG9uJyk7XHJcbiAgY29uc3QgY2FyZExpa2VDb3VudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19saWtlLWNvdW50Jyk7XHJcbiAgY2FyZEltYWdlLnNyYyA9IGRhdGEubGluaztcclxuICBjYXJkVGl0bGUuYWx0ID0gZGF0YS5uYW1lO1xyXG4gIGNhcmRUaXRsZS50ZXh0Q29udGVudCA9IGRhdGEubmFtZTtcclxuICBjYXJkTGlrZUNvdW50LnRleHRDb250ZW50ID0gZGF0YS5saWtlcy5sZW5ndGg7XHJcbiAgY2FyZEltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb3BlbkltZyhkYXRhKSk7XHJcbiAgY2FyZExpa2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBoYW5kbGVMaWtlKGRhdGEsIElELCBjYXJkRWxlbWVudCkpO1xyXG4gIGNhcmRFbGVtZW50LmlkID0gZGF0YVsnX2lkJ107XHJcbiAgaWYgKGRhdGEub3duZXIgJiYgSUQgIT09IGRhdGEub3duZXJbJ19pZCddKSB7XHJcbiAgICBjYXJkRGVsZXRlQnV0dG9uLnJlbW92ZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJkRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICByZW1vdmVDYXJkKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGlmIChjaGVjayhkYXRhLCBJRCkpIHtcclxuICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NhcmRfX2xpa2UtYnV0dG9uX2lzLWFjdGl2ZScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJkTGlrZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdjYXJkX19saWtlLWJ1dHRvbl9pcy1hY3RpdmUnKTtcclxuICB9XHJcbiAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMaWtlKGNhcmQsIElELCBjYXJkRWxlbWVudCkge1xyXG4gIGNvbnN0IGJ1dHRvbkxpa2UgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fbGlrZS1idXR0b24nKTtcclxuICBjb25zdCBidXR0b25Db3VudCA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19saWtlLWNvdW50JylcclxuICBpZiAoY2hlY2soY2FyZCwgSUQpKSB7XHJcbiAgICBkZWxldGVMaWtlKGNhcmQpXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBidXR0b25Db3VudC50ZXh0Q29udGVudCA9IHJlcy5saWtlcy5sZW5ndGg7XHJcbiAgICAgICAgYnV0dG9uTGlrZS5jbGFzc0xpc3QucmVtb3ZlKCdjYXJkX19saWtlLWJ1dHRvbl9pcy1hY3RpdmUnKTtcclxuICAgICAgICBjYXJkLmxpa2VzID0gcmVzLmxpa2VzO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRMaWtlKGNhcmQpXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBidXR0b25Db3VudC50ZXh0Q29udGVudCA9IHJlcy5saWtlcy5sZW5ndGg7XHJcbiAgICAgICAgYnV0dG9uTGlrZS5jbGFzc0xpc3QuYWRkKCdjYXJkX19saWtlLWJ1dHRvbl9pcy1hY3RpdmUnKTtcclxuICAgICAgICBjYXJkLmxpa2VzID0gcmVzLmxpa2VzO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVjayhkYXRhLCBJRCkge1xyXG4gIHJldHVybiBkYXRhLmxpa2VzLnNvbWUoKGkpID0+IGlbJ19pZCddID09PSBJRCk7XHJcbn0iLCJleHBvcnQgeyBvcGVuTW9kYWwsIGNsb3NlTW9kYWwgfTtcclxuXHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbChwb3B1cCkge1xyXG4gIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3BvcHVwX2lzLW9wZW5lZCcpO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjbG9zZUVzYyk7IC8vIElmIGRvbid0IHJlbW92ZSB0aGUgZXZlbnRsaXN0ZW5lciBmcm9tIGNsb3NlTW9kYWwsIGFuIGVycm9yIHdpbGwgb2NjdXIuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwocG9wdXApIHsgLy8gV2l0aG91dCAnc2V0VGltZW91dCcsIGl0IGJlY2FtZSByZWFsbHkgc2FkIGhlcmUuIDpjXHJcbiAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncG9wdXBfaXMtb3BlbmVkJyk7XHJcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNsb3NlRXNjKTsgLy8gXCJUaGlzIHBpZWNlIG9mIGNvZGUgZml4ZXMgdGhhdC5cIlxyXG59XHJcblxyXG5mdW5jdGlvbiBjbG9zZUVzYyhldnQpIHtcclxuICBldnQuY29kZSA9PT0gJ0VzY2FwZScgJiYgY2xvc2VNb2RhbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfaXMtb3BlbmVkJykpO1xyXG59IiwiY29uc3QgY2hlY2tWYWxpZCA9IChpbnB1dExpc3QpID0+IGlucHV0TGlzdC5zb21lKChpbnB1dCkgPT4gIWlucHV0LnZhbGlkaXR5LnZhbGlkKTtcclxuXHJcbmZ1bmN0aW9uIHNob3dJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGVycm9yTWVzc2FnZSwgeyBpbnB1dEVycm9yQ2xhc3MsIGVycm9yQ2xhc3MgfSkge1xyXG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcclxuICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChpbnB1dEVycm9yQ2xhc3MpO1xyXG4gIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKGVycm9yQ2xhc3MpO1xyXG4gIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgeyBpbnB1dEVycm9yQ2xhc3MsIGVycm9yQ2xhc3MgfSkge1xyXG4gIGNvbnN0IGVycm9yRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgKTtcclxuICBpbnB1dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShpbnB1dEVycm9yQ2xhc3MpO1xyXG4gIGVycm9yRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGVycm9yQ2xhc3MpO1xyXG4gIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9ICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIHZhbGlkYXRpb25Db25maWcpIHtcclxuICBpZiAoaW5wdXRFbGVtZW50LnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCkge1xyXG4gICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KGlucHV0RWxlbWVudC5kYXRhc2V0LmVycm9yTWVzc2FnZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGlucHV0RWxlbWVudC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XHJcbiAgfVxyXG4gIGlmICghaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKSB7XHJcbiAgICBzaG93SW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2UsIHZhbGlkYXRpb25Db25maWcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbGVtZW50LCB2YWxpZGF0aW9uQ29uZmlnKSB7XHJcbiAgY29uc3QgaW5wdXRMaXN0ID0gQXJyYXkuZnJvbShmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHZhbGlkYXRpb25Db25maWcuaW5wdXRTZWxlY3RvcikpO1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IodmFsaWRhdGlvbkNvbmZpZy5zdWJtaXRCdXR0b25TZWxlY3Rvcik7XHJcbiAgaW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICBpc1ZhbGlkKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIHZhbGlkYXRpb25Db25maWcpO1xyXG4gICAgICBkaXNhYmxlZEJ1dHRvbihpbnB1dExpc3QsIGJ1dHRvbiwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzYWJsZWRCdXR0b24oaW5wdXQsIGJ1dHRvbiwgdmFsaWRhdGlvbkNvbmZpZykge1xyXG4gIGlmIChjaGVja1ZhbGlkKGlucHV0KSkge1xyXG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25Db25maWcuaW5hY3RpdmVCdXR0b25DbGFzcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjbGVhclZhbGlkYXRpb24oZm9ybUVsZW1lbnQsIHZhbGlkYXRpb25Db25maWcpIHtcclxuICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFsaWRhdGlvbkNvbmZpZy5pbnB1dFNlbGVjdG9yKSk7XHJcbiAgY29uc3QgYnV0dG9uID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcih2YWxpZGF0aW9uQ29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcclxuICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgfSlcclxuICBkaXNhYmxlZEJ1dHRvbihpbnB1dExpc3QsIGJ1dHRvbiwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVWYWxpZGF0aW9uKHZhbGlkYXRpb25Db25maWcpIHtcclxuICBjb25zdCBmb3JtTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YWxpZGF0aW9uQ29uZmlnLmZvcm1TZWxlY3RvcikpO1xyXG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XHJcbiAgICBzZXRFdmVudExpc3RlbmVycyhmb3JtRWxlbWVudCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgfSk7XHJcbn0iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LmNzcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUNhcmQsIGhhbmRsZUxpa2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FyZC5qcyc7XHJcbmltcG9ydCB7IG9wZW5Nb2RhbCwgY2xvc2VNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC5qcyc7XHJcbmltcG9ydCB7IGVuYWJsZVZhbGlkYXRpb24sIGNsZWFyVmFsaWRhdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy92YWxpZGF0aW9uLmpzJztcclxuaW1wb3J0IHsgZ2V0SW5mbywgZ2V0Q2FyZHMsIGRlbGV0ZUNhcmRzLCB0b0NoYW5nZUF2YXRhciwgdG9DaGFuZ2VOYW1lcywgYWRkQ2FyZHN9IGZyb20gJy4vY29tcG9uZW50cy9hcGkuanMnO1xyXG5cclxuLy8gdmFyaWFibGUgbmFtZXNcclxuY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZXNfX2xpc3QnKTtcclxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1idXR0b24nKTtcclxuY29uc3QgcHJvZmlsZUJ1dHRvbkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hZGQtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2ZpbGVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19pbWFnZScpO1xyXG5jb25zdCBhdmF0YXJQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYXZhdGFyJyk7XHJcbmNvbnN0IGlucHV0TGlua0F2YXRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWF2YXRhci1pbnB1dCcpO1xyXG5jb25zdCBwb3B1cERlbGV0ZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfZGVsZXRlLWltYWdlJyk7XHJcbmNvbnN0IHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbiA9IHBvcHVwRGVsZXRlQ2FyZC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbicpO1xyXG5jb25zdCBwb3B1cEJ1dHRvbiA9IGF2YXRhclBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJyk7XHJcbmNvbnN0IG5ld0NhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF90eXBlX25ldy1jYXJkJyk7XHJcbmNvbnN0IGltYWdlT3BlblBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX3R5cGVfaW1hZ2UnKTtcclxuY29uc3QgaW1hZ2VQb3B1cEltYWdlID0gaW1hZ2VPcGVuUG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWFnZScpO1xyXG5jb25zdCBpbWFnZVBvcHVwQ2FwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2FwdGlvbicpXHJcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX3RpdGxlJyk7XHJcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19kZXNjcmlwdGlvbicpO1xyXG5jb25zdCBwb3B1cFByb2ZpbGVFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX3R5cGVfZWRpdCcpO1xyXG5jb25zdCBwb3B1cFByb2ZpbGVCdXR0b24gPSBwb3B1cFByb2ZpbGVFZGl0LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJylcclxuY29uc3QgZm9ybVByb2ZpbGVFZGl0ID0gcG9wdXBQcm9maWxlRWRpdC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm0nKTtcclxuY29uc3QgaW5wdXROYW1lID0gZm9ybVByb2ZpbGVFZGl0LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfdHlwZV9uYW1lJyk7XHJcbmNvbnN0IGlucHV0RGVzY3JpcHRpb24gPSBmb3JtUHJvZmlsZUVkaXQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF90eXBlX2Rlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IGFsbFBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpO1xyXG5jb25zdCBjYXJkQnV0dG9uID0gbmV3Q2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJylcclxuY29uc3QgaW5wdXRQbGFjZU5hbWVGb3JtQWRkTmV3Q2FyZCA9IG5ld0NhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2lucHV0X3R5cGVfY2FyZC1uYW1lJyk7XHJcbmNvbnN0IGlucHV0UGxhY2VMaW5rRm9ybUFkZE5ld0NhcmQgPSBuZXdDYXJkUG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF90eXBlX3VybCcpO1xyXG5jb25zdCB2YWxpZGF0aW9uQ29uZmlnID0ge1xyXG4gIGZvcm1TZWxlY3RvcjogJy5wb3B1cF9fZm9ybScsXHJcbiAgaW5wdXRTZWxlY3RvcjogJy5wb3B1cF9faW5wdXQnLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiAnLnBvcHVwX19idXR0b24nLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6ICdwb3B1cF9fYnV0dG9uX2Rpc2FibGVkJyxcclxuICBpbnB1dEVycm9yQ2xhc3M6ICdwb3B1cF9faW5wdXRfdHlwZV9lcnJvcicsXHJcbiAgZXJyb3JDbGFzczogJ3BvcHVwX19lcnJvcl92aXNpYmxlJ1xyXG59XHJcblxyXG5hbGxQb3B1cHMuZm9yRWFjaCgob3V0KSA9PiB7XHJcbiAgb3V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoe3RhcmdldCwgY3VycmVudFRhcmdldH0pID0+IHsgXHJcbiAgICBjb25zdCBpc1RhcmdldENsb3NlQnV0dG9uID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncG9wdXBfX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBpc1RhcmdldE92ZXJsYXkgPSB0YXJnZXQgPT09IGN1cnJlbnRUYXJnZXQ7XHJcbiAgICBpZiAoaXNUYXJnZXRDbG9zZUJ1dHRvbiB8fCBpc1RhcmdldE92ZXJsYXkpIGNsb3NlTW9kYWwob3V0KTtcclxuICB9KTtcclxufSk7XHJcblxyXG5Qcm9taXNlLmFsbChbZ2V0SW5mbyhcIi91c2Vycy9tZVwiKSwgZ2V0Q2FyZHMoXCIvY2FyZHNcIildKVxyXG4gIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gZGF0YVswXTtcclxuICAgIGNvbnN0IHVzZXJDYXJkcyA9IGRhdGFbMV0uZmlsdGVyKGNhcmQgPT4gY2FyZC5vd25lci5faWQgPT09IGN1cnJlbnRVc2VyLl9pZCk7XHJcbiAgICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IGRhdGFbMF0ubmFtZTtcclxuICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRhdGFbMF0uYWJvdXQ7XHJcbiAgICBwcm9maWxlSW1hZ2Uuc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke2RhdGFbMF0uYXZhdGFyfScpYFxyXG4gICAgdXNlckNhcmRzLmZvckVhY2goY2FyZCA9PiBjYXJkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVDYXJkKGNhcmQsIHJlbW92ZUNhcmQsIG9wZW5JbWcsIGhhbmRsZUxpa2UsIGN1cnJlbnRVc2VyLl9pZCkpKVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKSBcclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KGV2dCkgeyAvLyBmdW5jdGlvbiB0aGF0IGFsbG93cyBjaGFuZ2luZyB0aGUgcHJvZmlsZU5hbWUgYW5kIHByb2ZpbGVEZXNjcmlwdGlvbiBcclxuICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICBzYXZlSW5mbyh0cnVlLCBwb3B1cFByb2ZpbGVCdXR0b24pO1xyXG4gIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gaW5wdXROYW1lLnZhbHVlO1xyXG4gIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGlucHV0RGVzY3JpcHRpb24udmFsdWU7XHJcbiAgdG9DaGFuZ2VOYW1lcyhpbnB1dE5hbWUudmFsdWUsIGlucHV0RGVzY3JpcHRpb24udmFsdWUpXHJcbiAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgaWYgKHJlcyAmJiByZXMubmFtZSAmJiByZXMuYWJvdXQpIHtcclxuICAgICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSByZXMubmFtZTtcclxuICAgICAgcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcmVzLmFib3V0O1xyXG4gICAgfVxyXG4gIH0pXHJcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxyXG4gIC5maW5hbGx5KCgpID0+IHtcclxuICAgIHNhdmVJbmZvKGZhbHNlLCBwb3B1cFByb2ZpbGVCdXR0b24pO1xyXG4gICAgY2xvc2VNb2RhbChwb3B1cFByb2ZpbGVFZGl0KTtcclxuICB9KVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaGFuZGxlQXZhdGFyU3VibWl0KGV2dCkge1xyXG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNhdmVJbmZvKHRydWUsIHBvcHVwQnV0dG9uKTtcclxuICB0b0NoYW5nZUF2YXRhcihpbnB1dExpbmtBdmF0YXIudmFsdWUpXHJcbiAgICAudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIHByb2ZpbGVJbWFnZS5zdHlsZSA9IGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7cmVzLmF2YXRhcn0nKWBcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcclxuICAgIC5maW5hbGx5KCgpID0+IHsgXHJcbiAgICAgIHNhdmVJbmZvKGZhbHNlLCBwb3B1cEJ1dHRvbik7XHJcbiAgICAgIGNsb3NlTW9kYWwoYXZhdGFyUG9wdXApO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUNhcmRTdWJtaXQoZXZ0KSB7IC8vIGZ1bmN0aW9uIHRoYXQgYWRkcyBhIG5ldyBjYXJkIHRvIHRoZSBwYWdlXHJcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2F2ZUluZm8odHJ1ZSwgY2FyZEJ1dHRvbik7XHJcbiAgYWRkQ2FyZHMoaW5wdXRQbGFjZU5hbWVGb3JtQWRkTmV3Q2FyZC52YWx1ZSwgaW5wdXRQbGFjZUxpbmtGb3JtQWRkTmV3Q2FyZC52YWx1ZSlcclxuICAgIC50aGVuKChjYXJkKSA9PiB7XHJcbiAgICAgIGNhcmRDb250YWluZXIuYXBwZW5kKGNyZWF0ZUNhcmQoY2FyZCwgcmVtb3ZlQ2FyZCwgb3BlbkltZywgaGFuZGxlTGlrZSwgSUQpKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcclxuICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgc2F2ZUluZm8oZmFsc2UsIGNhcmRCdXR0b24pO1xyXG4gICAgICBjbG9zZU1vZGFsKG5ld0NhcmRQb3B1cCk7XHJcbiAgICB9KVxyXG4gIG5ld0NhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm0nKS5yZXNldCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVEZWxldGVDYXJkKGV2dCkge1xyXG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNhdmVJbmZvKHRydWUsIHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbik7XHJcbiAgY29uc3QgY2FyZElEID0gcG9wdXBEZWxldGVDYXJkQnV0dG9uLmRhdGFzZXQuY2FyZElkO1xyXG4gIGNvbnNvbGUubG9nKFwiQ2FyZCBJRCB0byBkZWxldGU6XCIsIGNhcmRJRCk7XHJcbiAgZGVsZXRlQ2FyZHMoY2FyZElEKVxyXG4gICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnQ2FyZCBzdWNjZXNzZnVsbHkgZGVsZXRlZCBmcm9tIHNlcnZlcicpO1xyXG4gICAgICBjb25zdCBkZWxldGVDYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FyZElEKTtcclxuICAgICAgaWYgKGRlbGV0ZUNhcmQpIHtcclxuICAgICAgICBkZWxldGVDYXJkLnJlbW92ZSgpO1xyXG4gICAgICAgIHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbi5kYXRhc2V0LmNhcmRJZCA9ICcnO1xyXG4gICAgICAgIHNhdmVJbmZvKGZhbHNlLCBwb3B1cERlbGV0ZUNhcmRCdXR0b24pO1xyXG4gICAgICAgIGNsb3NlTW9kYWwocG9wdXBEZWxldGVDYXJkKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUNhcmQoY2FyZCkge1xyXG4gIG9wZW5Nb2RhbChwb3B1cERlbGV0ZUNhcmQpO1xyXG4gIHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbi5kYXRhc2V0LmNhcmRJZCA9IGNhcmRbJ19pZCddO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuSW1nKGRhdGEpIHtcclxuICBpbWFnZVBvcHVwSW1hZ2UuYWx0ID0gZGF0YS5uYW1lO1xyXG4gIGltYWdlUG9wdXBDYXB0aW9uLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xyXG4gIGltYWdlUG9wdXBJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgb3Blbk1vZGFsKGltYWdlT3BlblBvcHVwKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNhdmVJbmZvKGxvYWQsIGJ1dHRvblRleHQpIHtcclxuICBpZiAobG9hZCkge1xyXG4gICAgYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9ICfQodC+0YXRgNCw0L3QtdC90LjQtS4uLidcclxuICB9IGVsc2Uge1xyXG4gICAgYnV0dG9uVGV4dC50ZXh0Q29udGVudCA9IGJ1dHRvblRleHQuZGF0YXNldC5idXR0b25UZXh0O1xyXG4gIH1cclxufVxyXG5cclxucHJvZmlsZUVkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaW5wdXROYW1lLnZhbHVlID0gcHJvZmlsZU5hbWUudGV4dENvbnRlbnQ7XHJcbiAgaW5wdXREZXNjcmlwdGlvbi52YWx1ZSA9IHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudDtcclxuICBjbGVhclZhbGlkYXRpb24ocG9wdXBQcm9maWxlRWRpdCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgb3Blbk1vZGFsKHBvcHVwUHJvZmlsZUVkaXQpO1xyXG59KTtcclxuXHJcbnByb2ZpbGVCdXR0b25BZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY2xlYXJWYWxpZGF0aW9uKG5ld0NhcmRQb3B1cCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgb3Blbk1vZGFsKG5ld0NhcmRQb3B1cCk7XHJcbn0pO1xyXG5cclxucHJvZmlsZUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNsZWFyVmFsaWRhdGlvbihhdmF0YXJQb3B1cCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgaW5wdXRMaW5rQXZhdGFyLnZhbHVlID0gJyc7XHJcbiAgb3Blbk1vZGFsKGF2YXRhclBvcHVwKTtcclxufSlcclxuXHJcbm5ld0NhcmRQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVDYXJkU3VibWl0KTtcclxuZm9ybVByb2ZpbGVFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZVByb2ZpbGVGb3JtU3VibWl0KTtcclxuYXZhdGFyUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlQXZhdGFyU3VibWl0KTtcclxucG9wdXBEZWxldGVDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlRGVsZXRlQ2FyZCk7XHJcblxyXG5lbmFibGVWYWxpZGF0aW9uKHZhbGlkYXRpb25Db25maWcpOyJdLCJuYW1lcyI6WyJjb25maWciLCJiYXNlVXJsIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJwb3N0IiwidXNlcnMiLCJkYXRhIiwibWV0aG9kIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiZmV0Y2giLCJjb25jYXQiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInRoZW4iLCJyZXMiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImNhcmRUZW1wbGF0ZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbnRlbnQiLCJjcmVhdGVDYXJkIiwicmVtb3ZlQ2FyZCIsIm9wZW5JbWciLCJoYW5kbGVMaWtlIiwiSUQiLCJjYXJkRWxlbWVudCIsImNsb25lTm9kZSIsImNhcmREZWxldGVCdXR0b24iLCJjYXJkSW1hZ2UiLCJjYXJkVGl0bGUiLCJjYXJkTGlrZUJ1dHRvbiIsImNhcmRMaWtlQ291bnQiLCJzcmMiLCJsaW5rIiwiYWx0IiwibmFtZSIsInRleHRDb250ZW50IiwibGlrZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiaWQiLCJvd25lciIsInJlbW92ZSIsImNoZWNrIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2FyZCIsImJ1dHRvbkxpa2UiLCJidXR0b25Db3VudCIsImNhdGNoIiwiZXJyIiwiYWRkTGlrZSIsInNvbWUiLCJpIiwib3Blbk1vZGFsIiwicG9wdXAiLCJjbG9zZUVzYyIsImNsb3NlTW9kYWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0IiwiY29kZSIsImNoZWNrVmFsaWQiLCJpbnB1dExpc3QiLCJpbnB1dCIsInZhbGlkaXR5IiwidmFsaWQiLCJoaWRlSW5wdXRFcnJvciIsImZvcm1FbGVtZW50IiwiaW5wdXRFbGVtZW50IiwiX3JlZjIiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiZXJyb3JFbGVtZW50IiwiZGlzYWJsZWRCdXR0b24iLCJidXR0b24iLCJ2YWxpZGF0aW9uQ29uZmlnIiwiZGlzYWJsZWQiLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiY2xlYXJWYWxpZGF0aW9uIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImlucHV0U2VsZWN0b3IiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsImZvckVhY2giLCJjYXJkQ29udGFpbmVyIiwicHJvZmlsZUVkaXRCdXR0b24iLCJwcm9maWxlQnV0dG9uQWRkIiwicHJvZmlsZUltYWdlIiwiYXZhdGFyUG9wdXAiLCJpbnB1dExpbmtBdmF0YXIiLCJnZXRFbGVtZW50QnlJZCIsInBvcHVwRGVsZXRlQ2FyZCIsInBvcHVwRGVsZXRlQ2FyZEJ1dHRvbiIsInBvcHVwQnV0dG9uIiwibmV3Q2FyZFBvcHVwIiwiaW1hZ2VPcGVuUG9wdXAiLCJpbWFnZVBvcHVwSW1hZ2UiLCJpbWFnZVBvcHVwQ2FwdGlvbiIsInByb2ZpbGVOYW1lIiwicHJvZmlsZURlc2NyaXB0aW9uIiwicG9wdXBQcm9maWxlRWRpdCIsInBvcHVwUHJvZmlsZUJ1dHRvbiIsImZvcm1Qcm9maWxlRWRpdCIsImlucHV0TmFtZSIsImlucHV0RGVzY3JpcHRpb24iLCJhbGxQb3B1cHMiLCJjYXJkQnV0dG9uIiwiaW5wdXRQbGFjZU5hbWVGb3JtQWRkTmV3Q2FyZCIsImlucHV0UGxhY2VMaW5rRm9ybUFkZE5ld0NhcmQiLCJmb3JtU2VsZWN0b3IiLCJkYXRhc2V0IiwiY2FyZElkIiwic2F2ZUluZm8iLCJsb2FkIiwiYnV0dG9uVGV4dCIsIm91dCIsIl9yZWYiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiY29udGFpbnMiLCJQcm9taXNlIiwiYWxsIiwiY3VycmVudFVzZXIiLCJ1c2VyQ2FyZHMiLCJmaWx0ZXIiLCJfaWQiLCJhYm91dCIsInN0eWxlIiwiYXZhdGFyIiwiYXBwZW5kIiwidmFsdWUiLCJkYXRhTmFtZSIsImRhdGFMaW5rIiwicHJldmVudERlZmF1bHQiLCJmaW5hbGx5IiwicmVzZXQiLCJ0b0NoYW5nZU5hbWVzIiwiYXZhdGFyTGluayIsImNhcmRJRCIsImRlbGV0ZUNhcmQiLCJwYXR0ZXJuTWlzbWF0Y2giLCJzZXRDdXN0b21WYWxpZGl0eSIsImVycm9yTWVzc2FnZSIsInNob3dJbnB1dEVycm9yIiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJpc1ZhbGlkIiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJlbmFibGVWYWxpZGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==