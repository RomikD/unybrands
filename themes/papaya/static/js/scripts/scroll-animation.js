export function scrollAnimation() {
  const titles = document.querySelectorAll('#vision .title');
  const titleOffset = 200;

  for (const title of titles) {
    // находим сецкию по id
    const textBlock = document.querySelector(`#${title.dataset.id}`);
    window.addEventListener('scroll', function() {
      const { top, bottom } = getCoords(textBlock); // деструктуризация

      if (
        pageYOffset >= (top - titleOffset)
        && pageYOffset <= (bottom - titleOffset)
      ) {
        toggle(title, textBlock);
      }
    });
  }

  function toggle(title, textBlock) {
    const active = document.querySelector('#vision .title-active');
    const textActive = document.querySelector('#vision .text-active');

    active.classList.remove('title-active');
    title.classList.add('title-active');

    textActive.classList.remove('text-active');
    textBlock.classList.add('text-active');
  }

  // получаем координаты элемента в контексте документа
  function getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      right: box.right + pageXOffset,
      bottom: box.bottom + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
}
