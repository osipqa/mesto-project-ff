(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"637888a1-9ced-4570-b92f-3c1ad708077b","Content-Type":"application/json"}};function t(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST";return fetch("".concat(e.baseUrl).concat(t),{method:r,headers:e.headers,body:JSON.stringify(n)}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Error: ".concat(e.status))}))}var n=document.querySelector("#card-template").content.querySelector(".places__item");function r(e,t,r,o,c){var a=n.cloneNode(!0),i=a.querySelector(".card__delete-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__title"),d=a.querySelector(".card__like-button"),p=a.querySelector(".card__like-count");return l.src=e.link,s.alt=e.name,s.textContent=e.name,p.textContent=e.likes.length,l.addEventListener("click",(function(){return r(e)})),d.addEventListener("click",(function(){return o(e,c,a)})),a.id=e._id,i.remove(),u(e,c)?d.classList.add("card__like-button_is-active"):d.classList.remove("card__like-button_is-active"),a}function o(e,n,r){var o,a=r.querySelector(".card__like-button"),i=r.querySelector(".card__like-count");u(e,n)?(o=e,t("/cards/likes/".concat(o._id),{},"DELETE")).then((function(t){a.classList.remove("card__like-button_is-active"),i.textContent=t.likes.length,e.likes=t.likes})).catch(c):function(e){return t("/cards/likes/".concat(e._id),{},"PUT")}(e).then((function(t){a.classList.add("card__like-button_is-active"),i.textContent=t.likes.length,e.likes=t.likes})).catch(c)}function c(e){console.log("Error message: ".concat(e))}function u(e,t){return e.likes.some((function(e){return e._id===t}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.code&&i(document.querySelector(".popup_is-opened"))}var s=function(e){return e.some((function(e){return!e.validity.valid}))};function d(e,t,n){var r=n.inputErrorClass,o=n.errorClass,c=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),c.classList.remove(o),c.textContent=""}function p(e,t,n){s(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))}function _(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),p(n,r,t)}var f=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),y=document.querySelector(".profile__image"),S=document.querySelector(".popup__avatar"),h=document.getElementById("link-avatar-input"),q=document.querySelector(".popup_delete-image"),b=q.querySelector(".popup__button"),E=S.querySelector(".popup__button"),k=document.querySelector(".popup_type_new-card"),C=document.querySelector(".popup_type_image"),L=C.querySelector(".popup__image"),g=document.querySelector(".popup__caption"),x=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),A=document.querySelector(".popup_type_edit"),P=A.querySelector(".popup__button"),j=A.querySelector(".popup__form"),B=j.querySelector(".popup__input_type_name"),D=j.querySelector(".popup__input_type_description"),w=document.querySelectorAll(".popup"),I=k.querySelector(".popup__button"),U=k.querySelector(".popup__input_type_card-name"),M=k.querySelector(".popup__input_type_url"),G={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function H(e){L.alt=e.name,g.textContent=e.name,L.src=e.link,a(C)}function N(e,t){t.textContent=e?"Сохранение...":t.dataset.buttonText}w.forEach((function(e){e.addEventListener("mouseup",(function(t){var n=t.target,r=t.currentTarget;(n.classList.contains("popup__close")||n===r)&&i(e)}))})),Promise.all([("/users/me",fetch("".concat(e.baseUrl).concat("/users/me"),{method:"GET",headers:e.headers}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Error: ".concat(e.status))}))),fetch("".concat(e.baseUrl).concat("/cards"),{method:"GET",headers:e.headers}).then((function(e){return e.json()})).catch((function(e){return Promise.reject("Error: ".concat(e.status))}))]).then((function(e){var t=e[0],n=e[1].filter((function(e){return e.owner._id===t._id}));x.textContent=e[0].name,T.textContent=e[0].about,y.style="background-image: url('".concat(e[0].avatar,"')"),n.forEach((function(e){return f.append(r(e,0,H,o,t._id))}))})).catch((function(e){return Promise.reject("Error: ".concat(e.status))})),m.addEventListener("click",(function(){B.value=x.textContent,D.value=T.textContent,_(A,G),a(A)})),v.addEventListener("click",(function(){_(k,G),a(k)})),y.addEventListener("click",(function(){h.value="",_(S,G),a(S)})),k.addEventListener("submit",(function(e){var n,c;e.preventDefault(),N(!0,I),(n=U.value,c=M.value,t("/cards",{name:n,link:c})).then((function(e){f.append(r(e,0,H,o,ID))})).catch((function(e){return console.log(e)})).finally((function(){N(!1,I),i(k)})),k.querySelector(".popup__form").reset()})),j.addEventListener("submit",(function(e){e.preventDefault(),N(!0,P),x.textContent=B.value,T.textContent=D.value,function(e,n){return t("/users/me",{name:e,about:n},"PATCH")}(B.value,D.value).then((function(e){e&&e.name&&e.about&&(x.textContent=e.name,T.textContent=e.about)})).catch((function(e){return console.log(e)})).finally((function(){N(!1,P),i(A)}))})),S.addEventListener("submit",(function(e){var n;e.preventDefault(),N(!0,E),(n=h.value,t("/users/me/avatar",{avatar:n},"PATCH")).then((function(e){y.style="background-image: url('".concat(e.avatar,"')")})).catch((function(e){return console.log(e)})).finally((function(){N(!1,E),i(S)}))})),b.addEventListener("click",(function(e){e.preventDefault(),N(!0,b);var n,r=b.dataset.cardId;(n=r,t("/cards/".concat(n),{},"DELETE")).then((function(){var e=document.getElementById(r);e&&(e.remove(),b.dataset.cardId="",N(!1,b),i(q))})).catch((function(e){return console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=r.inputErrorClass,c=r.errorClass,u=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),u.classList.add(c),u.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(G)})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUcsT0FBSXFDLFFBQVFDLElBQUl0QyxFQUFJLEdBQ2xDLElEaEVPLFNBQTBCOEQsR0FDZEksTUFBTUMsS0FBSzlELFNBQVMrRCxpQkFBaUJOLEVBQWlCbUMsZUFDOUQxQixTQUFRLFNBQUNqQixJQWhDcEIsU0FBMkJBLEVBQWFRLEdBQ3RDLElBQU1iLEVBQVlpQixNQUFNQyxLQUFLYixFQUFZYyxpQkFBaUJOLEVBQWlCTyxnQkFDckVSLEVBQVNQLEVBQVloRCxjQUFjd0QsRUFBaUJRLHNCQUMxRHJCLEVBQVVzQixTQUFRLFNBQUNoQixHQUNqQkEsRUFBYTdCLGlCQUFpQixTQUFTLFlBakIzQyxTQUFpQjRCLEVBQWFDLEVBQWNPLEdBQ3RDUCxFQUFhSixTQUFTNkUsZ0JBQ3hCekUsRUFBYTBFLGtCQUFrQjFFLEVBQWE4QyxRQUFRNkIsY0FFcEQzRSxFQUFhMEUsa0JBQWtCLElBRTVCMUUsRUFBYUosU0FBU0MsTUFHekJDLEVBQWVDLEVBQWFDLEVBQWNPLEdBdkI5QyxTQUF3QlIsRUFBYUMsRUFBYzJFLEVBQVkzQixHQUFtQyxJQUEvQjlDLEVBQWU4QyxFQUFmOUMsZ0JBQWlCQyxFQUFVNkMsRUFBVjdDLFdBQzVFQyxFQUFlTCxFQUFZaEQsY0FBYyxJQUFEZCxPQUFLK0QsRUFBYTVCLEdBQUUsV0FDbEU0QixFQUFhekIsVUFBVUMsSUFBSTBCLEdBQzNCRSxFQUFhN0IsVUFBVUMsSUFBSTJCLEdBQzNCQyxFQUFhbkMsWUFBYzBHLENBQzdCLENBZ0JJQyxDQUFlN0UsRUFBYUMsRUFBY0EsRUFBYTZFLGtCQUFtQnRFLEVBSTlFLENBT011RSxDQUFRL0UsRUFBYUMsRUFBY08sR0FDbkNGLEVBQWVYLEVBQVdZLEVBQVFDLEVBQ3BDLEdBQ0YsR0FDRixDQXdCSXdFLENBQWtCaEYsRUFBYVEsRUFDakMsR0FDRixDQ3dHQXlFLENBQWlCekUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL21lc3RvLXByb2plY3QtZmYvLi9zcmMvY29tcG9uZW50cy9hcGkuanMiLCJ3ZWJwYWNrOi8vbWVzdG8tcHJvamVjdC1mZi8uL3NyYy9jb21wb25lbnRzL2NhcmQuanMiLCJ3ZWJwYWNrOi8vbWVzdG8tcHJvamVjdC1mZi8uL3NyYy9jb21wb25lbnRzL21vZGFsLmpzIiwid2VicGFjazovL21lc3RvLXByb2plY3QtZmYvLi9zcmMvY29tcG9uZW50cy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL21lc3RvLXByb2plY3QtZmYvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY29uZmlnID0ge1xyXG4gIGJhc2VVcmw6ICdodHRwczovL25vbW9yZXBhcnRpZXMuY28vdjEvd2ZmLWNvaG9ydC0yJyxcclxuICBoZWFkZXJzOiB7XHJcbiAgICBhdXRob3JpemF0aW9uOiAnNjM3ODg4YTEtOWNlZC00NTcwLWI5MmYtM2MxYWQ3MDgwNzdiJyxcclxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbmZvKGRhdGEpIHtcclxuICByZXR1cm4gZmV0Y2goYCR7Y29uZmlnLmJhc2VVcmx9JHtkYXRhfWAsIHtcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnM6IGNvbmZpZy5oZWFkZXJzLFxyXG4gIH0pXHJcbiAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgLmNhdGNoKChlcnIpID0+IFByb21pc2UucmVqZWN0KGBFcnJvcjogJHtlcnIuc3RhdHVzfWApKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FyZHMoZGF0YSkge1xyXG4gIHJldHVybiBmZXRjaChgJHtjb25maWcuYmFzZVVybH0ke2RhdGF9YCwge1xyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVyczogY29uZmlnLmhlYWRlcnMsXHJcbiAgfSlcclxuICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAuY2F0Y2goKGVycikgPT4gUHJvbWlzZS5yZWplY3QoYEVycm9yOiAke2Vyci5zdGF0dXN9YCkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXNlcnMsIGRhdGEsIG1ldGhvZCA9IFwiUE9TVFwiKSB7XHJcbiAgcmV0dXJuIGZldGNoKGAke2NvbmZpZy5iYXNlVXJsfSR7dXNlcnN9YCwge1xyXG4gICAgbWV0aG9kLFxyXG4gICAgaGVhZGVyczogY29uZmlnLmhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICB9KVxyXG4gIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gIC5jYXRjaCgoZXJyKSA9PiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7ZXJyLnN0YXR1c31gKSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ2hhbmdlTmFtZXMoaW5wdXROYW1lLCBpbnB1dERlc2NyaXB0aW9uKSB7XHJcbiAgcmV0dXJuIHBvc3QoXCIvdXNlcnMvbWVcIiwgeyBuYW1lOiBpbnB1dE5hbWUsIGFib3V0OiBpbnB1dERlc2NyaXB0aW9ufSwgXCJQQVRDSFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ2hhbmdlQXZhdGFyKGF2YXRhckxpbmspIHtcclxuICByZXR1cm4gcG9zdChcIi91c2Vycy9tZS9hdmF0YXJcIiwgeyBhdmF0YXI6IGF2YXRhckxpbmsgfSwgXCJQQVRDSFwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENhcmRzKGRhdGFOYW1lLCBkYXRhTGluaykge1xyXG4gIHJldHVybiBwb3N0KFwiL2NhcmRzXCIsIHsgbmFtZTogZGF0YU5hbWUsIGxpbms6IGRhdGFMaW5rfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVDYXJkcyhjYXJkSWQpIHtcclxuICByZXR1cm4gcG9zdChgL2NhcmRzLyR7Y2FyZElkfWAsIHt9LCBcIkRFTEVURVwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUxpa2UoZGF0YSkge1xyXG4gIHJldHVybiBwb3N0KGAvY2FyZHMvbGlrZXMvJHtkYXRhWydfaWQnXX1gLCB7fSwgXCJERUxFVEVcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRMaWtlKGRhdGEpIHtcclxuICByZXR1cm4gcG9zdChgL2NhcmRzL2xpa2VzLyR7ZGF0YVsnX2lkJ119YCwge30sIFwiUFVUXCIpO1xyXG59IiwiaW1wb3J0IHsgYWRkTGlrZSwgZGVsZXRlTGlrZSB9IGZyb20gXCIuL2FwaVwiO1xyXG5leHBvcnQgeyBjcmVhdGVDYXJkLCBoYW5kbGVMaWtlIH07XHJcblxyXG5jb25zdCBjYXJkVGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZC10ZW1wbGF0ZScpLmNvbnRlbnQucXVlcnlTZWxlY3RvcignLnBsYWNlc19faXRlbScpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2FyZChkYXRhLCByZW1vdmVDYXJkLCBvcGVuSW1nLCBoYW5kbGVMaWtlLCBJRCkge1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZFRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKTtcclxuICBjb25zdCBjYXJkRGVsZXRlQnV0dG9uID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX2RlbGV0ZS1idXR0b24nKTtcclxuICBjb25zdCBjYXJkSW1hZ2UgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9faW1hZ2UnKTtcclxuICBjb25zdCBjYXJkVGl0bGUgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdGl0bGUnKTtcclxuICBjb25zdCBjYXJkTGlrZUJ1dHRvbiA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19saWtlLWJ1dHRvbicpO1xyXG4gIGNvbnN0IGNhcmRMaWtlQ291bnQgPSBjYXJkRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fbGlrZS1jb3VudCcpO1xyXG4gIGNhcmRJbWFnZS5zcmMgPSBkYXRhLmxpbms7XHJcbiAgY2FyZFRpdGxlLmFsdCA9IGRhdGEubmFtZTtcclxuICBjYXJkVGl0bGUudGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgY2FyZExpa2VDb3VudC50ZXh0Q29udGVudCA9IGRhdGEubGlrZXMubGVuZ3RoO1xyXG4gIGNhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG9wZW5JbWcoZGF0YSkpO1xyXG4gIGNhcmRMaWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gaGFuZGxlTGlrZShkYXRhLCBJRCwgY2FyZEVsZW1lbnQpKTtcclxuICBjYXJkRWxlbWVudC5pZCA9IGRhdGFbJ19pZCddO1xyXG4gIGNhcmREZWxldGVCdXR0b24ucmVtb3ZlKCk7XHJcbiAgaWYgKGNoZWNrKGRhdGEsIElEKSkge1xyXG4gICAgY2FyZExpa2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnY2FyZF9fbGlrZS1idXR0b25faXMtYWN0aXZlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNhcmRMaWtlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NhcmRfX2xpa2UtYnV0dG9uX2lzLWFjdGl2ZScpO1xyXG4gIH1cclxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUxpa2UoY2FyZCwgSUQsIGNhcmRFbGVtZW50KSB7XHJcbiAgY29uc3QgYnV0dG9uTGlrZSA9IGNhcmRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkX19saWtlLWJ1dHRvbicpO1xyXG4gIGNvbnN0IGJ1dHRvbkNvdW50ID0gY2FyZEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRfX2xpa2UtY291bnQnKVxyXG4gIGlmIChjaGVjayhjYXJkLCBJRCkpIHtcclxuICAgIGRlbGV0ZUxpa2UoY2FyZClcclxuICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgIGJ1dHRvbkxpa2UuY2xhc3NMaXN0LnJlbW92ZSgnY2FyZF9fbGlrZS1idXR0b25faXMtYWN0aXZlJyk7XHJcbiAgICAgICAgYnV0dG9uQ291bnQudGV4dENvbnRlbnQgPSByZXMubGlrZXMubGVuZ3RoO1xyXG4gICAgICAgIGNhcmQubGlrZXMgPSByZXMubGlrZXM7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChoYW5kbGVMaWtlRXJyb3IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhZGRMaWtlKGNhcmQpXHJcbiAgICAgIC50aGVuKChyZXMpID0+IHtcclxuICAgICAgICBidXR0b25MaWtlLmNsYXNzTGlzdC5hZGQoJ2NhcmRfX2xpa2UtYnV0dG9uX2lzLWFjdGl2ZScpO1xyXG4gICAgICAgIGJ1dHRvbkNvdW50LnRleHRDb250ZW50ID0gcmVzLmxpa2VzLmxlbmd0aDtcclxuICAgICAgICBjYXJkLmxpa2VzID0gcmVzLmxpa2VzO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goaGFuZGxlTGlrZUVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUxpa2VFcnJvcihlcnIpIHtcclxuICBjb25zb2xlLmxvZyhgRXJyb3IgbWVzc2FnZTogJHtlcnJ9YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrKGRhdGEsIElEKSB7XHJcbiAgcmV0dXJuIGRhdGEubGlrZXMuc29tZSgoaSkgPT4gaVsnX2lkJ10gPT09IElEKTtcclxufSIsImV4cG9ydCB7IG9wZW5Nb2RhbCwgY2xvc2VNb2RhbCB9O1xyXG5cclxuZnVuY3Rpb24gb3Blbk1vZGFsKHBvcHVwKSB7XHJcbiAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfaXMtb3BlbmVkJyk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGNsb3NlRXNjKTsgLy8gSWYgZG9uJ3QgcmVtb3ZlIHRoZSBldmVudGxpc3RlbmVyIGZyb20gY2xvc2VNb2RhbCwgYW4gZXJyb3Igd2lsbCBvY2N1ci5cclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbChwb3B1cCkgeyAvLyBXaXRob3V0ICdzZXRUaW1lb3V0JywgaXQgYmVjYW1lIHJlYWxseSBzYWQgaGVyZS4gOmNcclxuICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9pcy1vcGVuZWQnKTtcclxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2xvc2VFc2MpOyAvLyBcIlRoaXMgcGllY2Ugb2YgY29kZSBmaXhlcyB0aGF0LlwiXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlRXNjKGV2dCkge1xyXG4gIGV2dC5jb2RlID09PSAnRXNjYXBlJyAmJiBjbG9zZU1vZGFsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9pcy1vcGVuZWQnKSk7XHJcbn0iLCJjb25zdCBjaGVja1ZhbGlkID0gKGlucHV0TGlzdCkgPT4gaW5wdXRMaXN0LnNvbWUoKGlucHV0KSA9PiAhaW5wdXQudmFsaWRpdHkudmFsaWQpO1xyXG5cclxuZnVuY3Rpb24gc2hvd0lucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgZXJyb3JNZXNzYWdlLCB7IGlucHV0RXJyb3JDbGFzcywgZXJyb3JDbGFzcyB9KSB7XHJcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xyXG4gIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKGlucHV0RXJyb3JDbGFzcyk7XHJcbiAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoZXJyb3JDbGFzcyk7XHJcbiAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlSW5wdXRFcnJvcihmb3JtRWxlbWVudCwgaW5wdXRFbGVtZW50LCB7IGlucHV0RXJyb3JDbGFzcywgZXJyb3JDbGFzcyB9KSB7XHJcbiAgY29uc3QgZXJyb3JFbGVtZW50ID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xyXG4gIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGlucHV0RXJyb3JDbGFzcyk7XHJcbiAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoZXJyb3JDbGFzcyk7XHJcbiAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWQoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgdmFsaWRhdGlvbkNvbmZpZykge1xyXG4gIGlmIChpbnB1dEVsZW1lbnQudmFsaWRpdHkucGF0dGVybk1pc21hdGNoKSB7XHJcbiAgICBpbnB1dEVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoaW5wdXRFbGVtZW50LmRhdGFzZXQuZXJyb3JNZXNzYWdlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5wdXRFbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcclxuICB9XHJcbiAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcclxuICAgIHNob3dJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIGlucHV0RWxlbWVudC52YWxpZGF0aW9uTWVzc2FnZSwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGhpZGVJbnB1dEVycm9yKGZvcm1FbGVtZW50LCBpbnB1dEVsZW1lbnQsIHZhbGlkYXRpb25Db25maWcpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0RXZlbnRMaXN0ZW5lcnMoZm9ybUVsZW1lbnQsIHZhbGlkYXRpb25Db25maWcpIHtcclxuICBjb25zdCBpbnB1dExpc3QgPSBBcnJheS5mcm9tKGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodmFsaWRhdGlvbkNvbmZpZy5pbnB1dFNlbGVjdG9yKSk7XHJcbiAgY29uc3QgYnV0dG9uID0gZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcih2YWxpZGF0aW9uQ29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcclxuICBpbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgIGlzVmFsaWQoZm9ybUVsZW1lbnQsIGlucHV0RWxlbWVudCwgdmFsaWRhdGlvbkNvbmZpZyk7XHJcbiAgICAgIGRpc2FibGVkQnV0dG9uKGlucHV0TGlzdCwgYnV0dG9uLCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNhYmxlZEJ1dHRvbihpbnB1dCwgYnV0dG9uLCB2YWxpZGF0aW9uQ29uZmlnKSB7XHJcbiAgaWYgKGNoZWNrVmFsaWQoaW5wdXQpKSB7XHJcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkNvbmZpZy5pbmFjdGl2ZUJ1dHRvbkNsYXNzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uQ29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyVmFsaWRhdGlvbihmb3JtRWxlbWVudCwgdmFsaWRhdGlvbkNvbmZpZykge1xyXG4gIGNvbnN0IGlucHV0TGlzdCA9IEFycmF5LmZyb20oZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh2YWxpZGF0aW9uQ29uZmlnLmlucHV0U2VsZWN0b3IpKTtcclxuICBjb25zdCBidXR0b24gPSBmb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKHZhbGlkYXRpb25Db25maWcuc3VibWl0QnV0dG9uU2VsZWN0b3IpO1xyXG4gIGlucHV0TGlzdC5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG4gICAgaGlkZUlucHV0RXJyb3IoZm9ybUVsZW1lbnQsIGlucHV0LCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICB9KVxyXG4gIGRpc2FibGVkQnV0dG9uKGlucHV0TGlzdCwgYnV0dG9uLCB2YWxpZGF0aW9uQ29uZmlnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVZhbGlkYXRpb24odmFsaWRhdGlvbkNvbmZpZykge1xyXG4gIGNvbnN0IGZvcm1MaXN0ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHZhbGlkYXRpb25Db25maWcuZm9ybVNlbGVjdG9yKSk7XHJcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsZW1lbnQpID0+IHtcclxuICAgIHNldEV2ZW50TGlzdGVuZXJzKGZvcm1FbGVtZW50LCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICB9KTtcclxufVxyXG5cclxuLyogXHJcblxyXG7Qn9GA0LjQstC10YIsINGA0LXQstGM0LXRjtGAIDopXHJcblxyXG7QryDQt9C90LDRjiwg0YfRgtC+INC80L7QuSDQutC+0LQg0L/Qu9C+0YXQvtC5LCDQvdC+INGPLCDQv9GA0LDQstC00LAsINGB0YLQsNGA0LDRjtGB0YwhXHJcblxyXG7Ql9C00LXRgdGMINGPINC/0YDQvtGB0YLQviDQv9C+0LfQtNGA0LDQstC70Y/RjiDQktCw0YEg0YEg0L3QsNGB0YLRg9C/0LDRjtGJ0LjQvCDQv9GA0LDQt9C00L3QuNC60L7QvCwg0YEg0L3QsNGB0YLRg9C/0LDRjtGJ0LjQvCDQvdC+0LLRi9C8IDIwMjQg0LPQvtC00L7QvCFcclxu0JbQtdC70LDRjiDQktCw0Lwg0LLRgdC10LPQviDRgdCw0LzQvtCz0L4g0L3QsNC40LvRg9GH0YjQtdCz0L4sINGH0LXQs9C+INGC0L7Qu9GM0LrQviDQstC+0LfQvNC+0LbQvdC+IDopXHJcblxyXG7QmtGB0YLQsNGC0LgsINCy0L7RgiDQktCw0Lwg0LXQu9C60LAsINC/0L7Qu9GM0LfRg9C50YLQtdGB0YwuIDpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxMDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMTAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDEwMTAxMDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAxMDEwMTAxMDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDEwMTAxMDEwMTAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDEwMTAxMDEwMTAxMDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMFxyXG5cclxuKi8iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LmNzcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUNhcmQsIGhhbmRsZUxpa2UgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FyZC5qcyc7XHJcbmltcG9ydCB7IG9wZW5Nb2RhbCwgY2xvc2VNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RhbC5qcyc7XHJcbmltcG9ydCB7IGVuYWJsZVZhbGlkYXRpb24sIGNsZWFyVmFsaWRhdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy92YWxpZGF0aW9uLmpzJztcclxuaW1wb3J0IHsgZ2V0SW5mbywgZ2V0Q2FyZHMsIGRlbGV0ZUNhcmRzLCB0b0NoYW5nZUF2YXRhciwgdG9DaGFuZ2VOYW1lcywgYWRkQ2FyZHN9IGZyb20gJy4vY29tcG9uZW50cy9hcGkuanMnO1xyXG5cclxuLy8gdmFyaWFibGUgbmFtZXNcclxuY29uc3QgY2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGFjZXNfX2xpc3QnKTtcclxuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1idXR0b24nKTtcclxuY29uc3QgcHJvZmlsZUJ1dHRvbkFkZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19hZGQtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2ZpbGVJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19pbWFnZScpO1xyXG5jb25zdCBhdmF0YXJQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYXZhdGFyJyk7XHJcbmNvbnN0IGlucHV0TGlua0F2YXRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5rLWF2YXRhci1pbnB1dCcpO1xyXG5jb25zdCBwb3B1cERlbGV0ZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfZGVsZXRlLWltYWdlJyk7XHJcbmNvbnN0IHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbiA9IHBvcHVwRGVsZXRlQ2FyZC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbicpO1xyXG5jb25zdCBwb3B1cEJ1dHRvbiA9IGF2YXRhclBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJyk7XHJcbmNvbnN0IG5ld0NhcmRQb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF90eXBlX25ldy1jYXJkJyk7XHJcbmNvbnN0IGltYWdlT3BlblBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX3R5cGVfaW1hZ2UnKTtcclxuY29uc3QgaW1hZ2VQb3B1cEltYWdlID0gaW1hZ2VPcGVuUG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbWFnZScpO1xyXG5jb25zdCBpbWFnZVBvcHVwQ2FwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY2FwdGlvbicpXHJcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGVfX3RpdGxlJyk7XHJcbmNvbnN0IHByb2ZpbGVEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlX19kZXNjcmlwdGlvbicpO1xyXG5jb25zdCBwb3B1cFByb2ZpbGVFZGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX3R5cGVfZWRpdCcpO1xyXG5jb25zdCBwb3B1cFByb2ZpbGVCdXR0b24gPSBwb3B1cFByb2ZpbGVFZGl0LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJylcclxuY29uc3QgZm9ybVByb2ZpbGVFZGl0ID0gcG9wdXBQcm9maWxlRWRpdC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Zvcm0nKTtcclxuY29uc3QgaW5wdXROYW1lID0gZm9ybVByb2ZpbGVFZGl0LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfdHlwZV9uYW1lJyk7XHJcbmNvbnN0IGlucHV0RGVzY3JpcHRpb24gPSBmb3JtUHJvZmlsZUVkaXQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF90eXBlX2Rlc2NyaXB0aW9uJyk7XHJcbmNvbnN0IGFsbFBvcHVwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpO1xyXG5jb25zdCBjYXJkQnV0dG9uID0gbmV3Q2FyZFBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uJylcclxuY29uc3QgaW5wdXRQbGFjZU5hbWVGb3JtQWRkTmV3Q2FyZCA9IG5ld0NhcmRQb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2lucHV0X3R5cGVfY2FyZC1uYW1lJyk7XHJcbmNvbnN0IGlucHV0UGxhY2VMaW5rRm9ybUFkZE5ld0NhcmQgPSBuZXdDYXJkUG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF90eXBlX3VybCcpO1xyXG5jb25zdCB2YWxpZGF0aW9uQ29uZmlnID0ge1xyXG4gIGZvcm1TZWxlY3RvcjogJy5wb3B1cF9fZm9ybScsXHJcbiAgaW5wdXRTZWxlY3RvcjogJy5wb3B1cF9faW5wdXQnLFxyXG4gIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiAnLnBvcHVwX19idXR0b24nLFxyXG4gIGluYWN0aXZlQnV0dG9uQ2xhc3M6ICdwb3B1cF9fYnV0dG9uX2Rpc2FibGVkJyxcclxuICBpbnB1dEVycm9yQ2xhc3M6ICdwb3B1cF9faW5wdXRfdHlwZV9lcnJvcicsXHJcbiAgZXJyb3JDbGFzczogJ3BvcHVwX19lcnJvcl92aXNpYmxlJ1xyXG59XHJcblxyXG5hbGxQb3B1cHMuZm9yRWFjaCgob3V0KSA9PiB7XHJcbiAgb3V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoe3RhcmdldCwgY3VycmVudFRhcmdldH0pID0+IHsgXHJcbiAgICBjb25zdCBpc1RhcmdldENsb3NlQnV0dG9uID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncG9wdXBfX2Nsb3NlJyk7XHJcbiAgICBjb25zdCBpc1RhcmdldE92ZXJsYXkgPSB0YXJnZXQgPT09IGN1cnJlbnRUYXJnZXQ7XHJcbiAgICBpZiAoaXNUYXJnZXRDbG9zZUJ1dHRvbiB8fCBpc1RhcmdldE92ZXJsYXkpIGNsb3NlTW9kYWwob3V0KTtcclxuICB9KTtcclxufSk7XHJcblxyXG5Qcm9taXNlLmFsbChbZ2V0SW5mbyhcIi91c2Vycy9tZVwiKSwgZ2V0Q2FyZHMoXCIvY2FyZHNcIildKVxyXG4gIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50VXNlciA9IGRhdGFbMF07XHJcbiAgICBjb25zdCB1c2VyQ2FyZHMgPSBkYXRhWzFdLmZpbHRlcihjYXJkID0+IGNhcmQub3duZXIuX2lkID09PSBjdXJyZW50VXNlci5faWQpO1xyXG4gICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSBkYXRhWzBdLm5hbWU7XHJcbiAgICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBkYXRhWzBdLmFib3V0O1xyXG4gICAgcHJvZmlsZUltYWdlLnN0eWxlID0gYGJhY2tncm91bmQtaW1hZ2U6IHVybCgnJHtkYXRhWzBdLmF2YXRhcn0nKWBcclxuICAgIHVzZXJDYXJkcy5mb3JFYWNoKGNhcmQgPT4gY2FyZENvbnRhaW5lci5hcHBlbmQoY3JlYXRlQ2FyZChjYXJkLCByZW1vdmVDYXJkLCBvcGVuSW1nLCBoYW5kbGVMaWtlLCBjdXJyZW50VXNlci5faWQpKSlcclxuICB9KVxyXG4gIC5jYXRjaCgoZXJyKSA9PiBQcm9taXNlLnJlamVjdChgRXJyb3I6ICR7ZXJyLnN0YXR1c31gKSk7XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdChldnQpIHsgLy8gZnVuY3Rpb24gdGhhdCBhbGxvd3MgY2hhbmdpbmcgdGhlIHByb2ZpbGVOYW1lIGFuZCBwcm9maWxlRGVzY3JpcHRpb24gXHJcbiAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgc2F2ZUluZm8odHJ1ZSwgcG9wdXBQcm9maWxlQnV0dG9uKTtcclxuICBwcm9maWxlTmFtZS50ZXh0Q29udGVudCA9IGlucHV0TmFtZS52YWx1ZTtcclxuICBwcm9maWxlRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBpbnB1dERlc2NyaXB0aW9uLnZhbHVlO1xyXG4gIHRvQ2hhbmdlTmFtZXMoaW5wdXROYW1lLnZhbHVlLCBpbnB1dERlc2NyaXB0aW9uLnZhbHVlKVxyXG4gIC50aGVuKChyZXMpID0+IHtcclxuICAgIGlmIChyZXMgJiYgcmVzLm5hbWUgJiYgcmVzLmFib3V0KSB7XHJcbiAgICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gcmVzLm5hbWU7XHJcbiAgICAgIHByb2ZpbGVEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHJlcy5hYm91dDtcclxuICAgIH1cclxuICB9KVxyXG4gIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcclxuICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICBzYXZlSW5mbyhmYWxzZSwgcG9wdXBQcm9maWxlQnV0dG9uKTtcclxuICAgIGNsb3NlTW9kYWwocG9wdXBQcm9maWxlRWRpdCk7XHJcbiAgfSlcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZUF2YXRhclN1Ym1pdChldnQpIHtcclxuICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICBzYXZlSW5mbyh0cnVlLCBwb3B1cEJ1dHRvbik7XHJcbiAgdG9DaGFuZ2VBdmF0YXIoaW5wdXRMaW5rQXZhdGFyLnZhbHVlKVxyXG4gICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICBwcm9maWxlSW1hZ2Uuc3R5bGUgPSBgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Jlcy5hdmF0YXJ9JylgXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXHJcbiAgICAuZmluYWxseSgoKSA9PiB7IFxyXG4gICAgICBzYXZlSW5mbyhmYWxzZSwgcG9wdXBCdXR0b24pO1xyXG4gICAgICBjbG9zZU1vZGFsKGF2YXRhclBvcHVwKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVDYXJkU3VibWl0KGV2dCkgeyAvLyBmdW5jdGlvbiB0aGF0IGFkZHMgYSBuZXcgY2FyZCB0byB0aGUgcGFnZVxyXG4gIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNhdmVJbmZvKHRydWUsIGNhcmRCdXR0b24pO1xyXG4gIGFkZENhcmRzKGlucHV0UGxhY2VOYW1lRm9ybUFkZE5ld0NhcmQudmFsdWUsIGlucHV0UGxhY2VMaW5rRm9ybUFkZE5ld0NhcmQudmFsdWUpXHJcbiAgICAudGhlbigoY2FyZCkgPT4ge1xyXG4gICAgICBjYXJkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVDYXJkKGNhcmQsIHJlbW92ZUNhcmQsIG9wZW5JbWcsIGhhbmRsZUxpa2UsIElEKSlcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXHJcbiAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgIHNhdmVJbmZvKGZhbHNlLCBjYXJkQnV0dG9uKTtcclxuICAgICAgY2xvc2VNb2RhbChuZXdDYXJkUG9wdXApO1xyXG4gICAgfSlcclxuICBuZXdDYXJkUG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwX19mb3JtJykucmVzZXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRGVsZXRlQ2FyZChldnQpIHtcclxuICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICBzYXZlSW5mbyh0cnVlLCBwb3B1cERlbGV0ZUNhcmRCdXR0b24pO1xyXG4gIGNvbnN0IGNhcmRJRCA9IHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbi5kYXRhc2V0LmNhcmRJZDtcclxuICBkZWxldGVDYXJkcyhjYXJkSUQpXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRlbGV0ZUNhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYXJkSUQpO1xyXG4gICAgICBpZiAoZGVsZXRlQ2FyZCkge1xyXG4gICAgICAgIGRlbGV0ZUNhcmQucmVtb3ZlKCk7XHJcbiAgICAgICAgcG9wdXBEZWxldGVDYXJkQnV0dG9uLmRhdGFzZXQuY2FyZElkID0gJyc7XHJcbiAgICAgICAgc2F2ZUluZm8oZmFsc2UsIHBvcHVwRGVsZXRlQ2FyZEJ1dHRvbik7XHJcbiAgICAgICAgY2xvc2VNb2RhbChwb3B1cERlbGV0ZUNhcmQpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ2FyZChjYXJkKSB7XHJcbiAgb3Blbk1vZGFsKHBvcHVwRGVsZXRlQ2FyZCk7XHJcbiAgcG9wdXBEZWxldGVDYXJkQnV0dG9uLmRhdGFzZXQuY2FyZElkID0gY2FyZFsnX2lkJ107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5JbWcoZGF0YSkge1xyXG4gIGltYWdlUG9wdXBJbWFnZS5hbHQgPSBkYXRhLm5hbWU7XHJcbiAgaW1hZ2VQb3B1cENhcHRpb24udGV4dENvbnRlbnQgPSBkYXRhLm5hbWU7XHJcbiAgaW1hZ2VQb3B1cEltYWdlLnNyYyA9IGRhdGEubGluaztcclxuICBvcGVuTW9kYWwoaW1hZ2VPcGVuUG9wdXApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2F2ZUluZm8obG9hZCwgYnV0dG9uVGV4dCkge1xyXG4gIGlmIChsb2FkKSB7XHJcbiAgICBidXR0b25UZXh0LnRleHRDb250ZW50ID0gJ9Ch0L7RhdGA0LDQvdC10L3QuNC1Li4uJ1xyXG4gIH0gZWxzZSB7XHJcbiAgICBidXR0b25UZXh0LnRleHRDb250ZW50ID0gYnV0dG9uVGV4dC5kYXRhc2V0LmJ1dHRvblRleHQ7XHJcbiAgfVxyXG59XHJcblxyXG5wcm9maWxlRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBpbnB1dE5hbWUudmFsdWUgPSBwcm9maWxlTmFtZS50ZXh0Q29udGVudDtcclxuICBpbnB1dERlc2NyaXB0aW9uLnZhbHVlID0gcHJvZmlsZURlc2NyaXB0aW9uLnRleHRDb250ZW50O1xyXG4gIGNsZWFyVmFsaWRhdGlvbihwb3B1cFByb2ZpbGVFZGl0LCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICBvcGVuTW9kYWwocG9wdXBQcm9maWxlRWRpdCk7XHJcbn0pO1xyXG5cclxucHJvZmlsZUJ1dHRvbkFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjbGVhclZhbGlkYXRpb24obmV3Q2FyZFBvcHVwLCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICBvcGVuTW9kYWwobmV3Q2FyZFBvcHVwKTtcclxufSk7XHJcblxyXG5wcm9maWxlSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgaW5wdXRMaW5rQXZhdGFyLnZhbHVlID0gJyc7XHJcbiAgY2xlYXJWYWxpZGF0aW9uKGF2YXRhclBvcHVwLCB2YWxpZGF0aW9uQ29uZmlnKTtcclxuICBvcGVuTW9kYWwoYXZhdGFyUG9wdXApO1xyXG59KVxyXG5cclxubmV3Q2FyZFBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGhhbmRsZUNhcmRTdWJtaXQpO1xyXG5mb3JtUHJvZmlsZUVkaXQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgaGFuZGxlUHJvZmlsZUZvcm1TdWJtaXQpO1xyXG5hdmF0YXJQb3B1cC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBoYW5kbGVBdmF0YXJTdWJtaXQpO1xyXG5wb3B1cERlbGV0ZUNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVEZWxldGVDYXJkKTtcclxuXHJcbmVuYWJsZVZhbGlkYXRpb24odmFsaWRhdGlvbkNvbmZpZyk7Il0sIm5hbWVzIjpbImNvbmZpZyIsImJhc2VVcmwiLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsInBvc3QiLCJ1c2VycyIsImRhdGEiLCJtZXRob2QiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJmZXRjaCIsImNvbmNhdCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlcyIsImpzb24iLCJjYXRjaCIsImVyciIsIlByb21pc2UiLCJyZWplY3QiLCJzdGF0dXMiLCJjYXJkVGVtcGxhdGUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250ZW50IiwiY3JlYXRlQ2FyZCIsInJlbW92ZUNhcmQiLCJvcGVuSW1nIiwiaGFuZGxlTGlrZSIsIklEIiwiY2FyZEVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjYXJkRGVsZXRlQnV0dG9uIiwiY2FyZEltYWdlIiwiY2FyZFRpdGxlIiwiY2FyZExpa2VCdXR0b24iLCJjYXJkTGlrZUNvdW50Iiwic3JjIiwibGluayIsImFsdCIsIm5hbWUiLCJ0ZXh0Q29udGVudCIsImxpa2VzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwicmVtb3ZlIiwiY2hlY2siLCJjbGFzc0xpc3QiLCJhZGQiLCJjYXJkIiwiYnV0dG9uTGlrZSIsImJ1dHRvbkNvdW50IiwiaGFuZGxlTGlrZUVycm9yIiwiYWRkTGlrZSIsImNvbnNvbGUiLCJsb2ciLCJzb21lIiwiaSIsIm9wZW5Nb2RhbCIsInBvcHVwIiwiY2xvc2VFc2MiLCJjbG9zZU1vZGFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImNvZGUiLCJjaGVja1ZhbGlkIiwiaW5wdXRMaXN0IiwiaW5wdXQiLCJ2YWxpZGl0eSIsInZhbGlkIiwiaGlkZUlucHV0RXJyb3IiLCJmb3JtRWxlbWVudCIsImlucHV0RWxlbWVudCIsIl9yZWYyIiwiaW5wdXRFcnJvckNsYXNzIiwiZXJyb3JDbGFzcyIsImVycm9yRWxlbWVudCIsImRpc2FibGVkQnV0dG9uIiwiYnV0dG9uIiwidmFsaWRhdGlvbkNvbmZpZyIsImRpc2FibGVkIiwiaW5hY3RpdmVCdXR0b25DbGFzcyIsImNsZWFyVmFsaWRhdGlvbiIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbnB1dFNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJmb3JFYWNoIiwiY2FyZENvbnRhaW5lciIsInByb2ZpbGVFZGl0QnV0dG9uIiwicHJvZmlsZUJ1dHRvbkFkZCIsInByb2ZpbGVJbWFnZSIsImF2YXRhclBvcHVwIiwiaW5wdXRMaW5rQXZhdGFyIiwiZ2V0RWxlbWVudEJ5SWQiLCJwb3B1cERlbGV0ZUNhcmQiLCJwb3B1cERlbGV0ZUNhcmRCdXR0b24iLCJwb3B1cEJ1dHRvbiIsIm5ld0NhcmRQb3B1cCIsImltYWdlT3BlblBvcHVwIiwiaW1hZ2VQb3B1cEltYWdlIiwiaW1hZ2VQb3B1cENhcHRpb24iLCJwcm9maWxlTmFtZSIsInByb2ZpbGVEZXNjcmlwdGlvbiIsInBvcHVwUHJvZmlsZUVkaXQiLCJwb3B1cFByb2ZpbGVCdXR0b24iLCJmb3JtUHJvZmlsZUVkaXQiLCJpbnB1dE5hbWUiLCJpbnB1dERlc2NyaXB0aW9uIiwiYWxsUG9wdXBzIiwiY2FyZEJ1dHRvbiIsImlucHV0UGxhY2VOYW1lRm9ybUFkZE5ld0NhcmQiLCJpbnB1dFBsYWNlTGlua0Zvcm1BZGROZXdDYXJkIiwiZm9ybVNlbGVjdG9yIiwic2F2ZUluZm8iLCJsb2FkIiwiYnV0dG9uVGV4dCIsImRhdGFzZXQiLCJvdXQiLCJfcmVmIiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImNvbnRhaW5zIiwiYWxsIiwiY3VycmVudFVzZXIiLCJ1c2VyQ2FyZHMiLCJmaWx0ZXIiLCJvd25lciIsIl9pZCIsImFib3V0Iiwic3R5bGUiLCJhdmF0YXIiLCJhcHBlbmQiLCJ2YWx1ZSIsImRhdGFOYW1lIiwiZGF0YUxpbmsiLCJwcmV2ZW50RGVmYXVsdCIsImZpbmFsbHkiLCJyZXNldCIsInRvQ2hhbmdlTmFtZXMiLCJhdmF0YXJMaW5rIiwiY2FyZElkIiwiY2FyZElEIiwiZGVsZXRlQ2FyZCIsInBhdHRlcm5NaXNtYXRjaCIsInNldEN1c3RvbVZhbGlkaXR5IiwiZXJyb3JNZXNzYWdlIiwic2hvd0lucHV0RXJyb3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImlzVmFsaWQiLCJzZXRFdmVudExpc3RlbmVycyIsImVuYWJsZVZhbGlkYXRpb24iXSwic291cmNlUm9vdCI6IiJ9