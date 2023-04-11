import React from 'react';
import css from './index.module.css'

const RecsInfo = () => {
  return (
    <div className={css.RecsWrapper}>
      <ul>
        <h2>1. Корсет</h2>
        <li>Снимите корсет с тела.</li>
        <li>Взбейте пуховую подушку или используйте специальную чистящую щетку, чтобы удалить пыль и грязь с корсета.</li>
        <li>Если на корсете есть пятна, используйте мягкую ткань, смоченную в небольшом количестве воды и мягкого моющего средства для удаления пятен.</li>
        <li>Никогда не используйте машинную стирку или сушку для корсета. </li>
      </ul>

      <ul>
        <h2>2. Джинсы</h2>
        <li>Переверните джинсы наизнанку и удалите все карманы.</li>
        <li>Заполните ванну прохладной водой и добавьте небольшое количество стирального порошка.</li>
        <li>Поместите джинсы в воду и оставьте их на 15-20 минут.</li>
        <li>После этого постепенно вытаскивайте джинсы из воды и очищайте пятна, используя мягкую щетку.</li>
        <li>Тщательно промойте джинсы в чистой прохладной воде до полного удаления стирального порошка.</li>
        <li>Выверните их наизнанку и повесьте на сушку на воздухе. Не сушите в сушильной машине.</li>
      </ul>

      <ul>
        <h2>3. Юбка</h2>
        <li>Проверьте этикетку на юбке, чтобы узнать, подходит ли она для стирки в стиральной машине. Если этикетки нет, стоит ручная стирка.</li>
        <li>Запустите стиральную машину на режиме для белого белья, используя стиральный порошок.</li>
        <li>Поместите юбку в машину и закройте люк.</li>
        <li>По окончании стирки, выньте юбку из стиральной машины и аккуратно выверните ее.</li>
        <li>Повесьте юбку на вешалку и дайте ей высохнуть.</li>
      </ul>

      <ul>
        <h2>4. Худи</h2>
        <li>Проверьте этикетку на худи, чтобы узнать, можно ли стирать его в стиральной машине, и какой температурный режим использовать.</li>
        <li>Запустите стиральную машину, используя стиральный порошок и соответствующий режим.</li>
        <li>Поместите худи в машину и закройте люк.</li>
        <li>По окончании стирки, выньте худи из стиральной машины и аккуратно выверните его.</li>
        <li>Повесьте худи на вешалку и дайте ему высохнуть.</li>
      </ul>

      <ul>
        <h2>Общие советы</h2>
        <li>Если на вещи есть пятна, важно быстро их удалить, чтобы они не впитались в ткань.</li>
        <li>Никогда не используйте отбеливающие средства для цветных вещей.</li>
        <li>Если у вас есть сомнения, можно ли стирать определенную вещь в стиральной машине, лучше стирать ее вручную.</li>
      </ul>

    </div>
  );
}

export default RecsInfo;