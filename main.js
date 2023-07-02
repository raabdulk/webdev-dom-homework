import { fetchPromiseFuncGet } from "./api.js";
import { renderUsers } from "./renderComments.js";
import { fetchPromiseFuncPost } from "./api.js";

export const listCommentElement = document.getElementById("list-comment")
export const enterNameElement = document.getElementById("enter-name")
export const enterCommentElement = document.getElementById("enter-comment")
export const buttonElement = document.getElementById("btn")
export const addFormElement = document.getElementById("addForm")

// Получаем список комментов с помощью функции fetch и метода запросов GET
// переехало в api.js
fetchPromiseFuncGet().then(() => renderUsers());

// Массив с комменами

export let users = [];
export function updateUsers(comments) {
    users = comments;
}

// Закрашиваем кнопку лайка
export const initLikeButton = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const likeButtonIndex = likeButtonElement.dataset.index;
            const listElement = users[likeButtonIndex];
  
            if (listElement.like) {
                listElement.likeNumber -= 1;
                listElement.like = false;
                listElement.colorLike = 'like-button no-active-like';
            } else {
                listElement.likeNumber += 1;
                listElement.like = true;
                listElement.colorLike = 'like-button -active-like';
            }
            renderUsers();
        });
    };
  };
initLikeButton();

// Добавляем ответ цитатой
const commentText = () => {
    const commentTextElements = document.querySelectorAll('.comment');
    for (const commentTextElement of commentTextElements) {
        commentTextElement.addEventListener("click", () => {
            const commTextElem = commentTextElement.querySelector('.comment-text')
            const nameTextElem = commentTextElement.querySelector('.comment-name')
            enterCommentElement.value = (` ${commTextElem.innerHTML} ${nameTextElem.innerHTML}`);
            renderUsers();
        });
    };
};
commentText();

// // Рендерим список комментов
// // переехало в renderComments.js
// renderUsers();

// Добавляем коммент кнопкой написать
buttonElement.addEventListener("click", () => {
    // Удалем класс error который навешивается при пустом инпуте
    enterNameElement.classList.remove('error');
    // Подсвечивает поле Name если оно пусто
    if (enterNameElement.value === "") {
        enterNameElement.classList.add('error');
        return;
    }
    // Удалем класс error который навешивается при пустом инпуте
    enterCommentElement.classList.remove('error');
    // Подсвечивает поле коммента если оно пусто
    if (enterCommentElement.value === "") {
        enterCommentElement.classList.add('error');
        return;
    }

    addFormElement.classList.add('hidden') // установить невидимость 

    // Добавляем коммент и имя в API с помошью метода POST
    // переехало в api.js
    fetchPromiseFuncPost();

    addFormElement.classList.remove('hidden') // убрать невидимость
});

console.log("It works!");