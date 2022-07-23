<template>
  <div class="category full-height column-block align-center">
    <div class="background full-width align-center column-block">
      <div class="all-categories column-block">
        <div class="all-categories__title">Другие категории</div>
        <HouseCategories />
      </div>

      <div class="sorting column-block full-width">
        <div class="route-path row-block">Главная > {{ $options.titles[category] }}</div>

        <div class="sorting-methods row-block align-center full-width justify-between">
          <div class="route-title">{{ $options.titles[category] }}</div>

          <div class="price-sort row-block">
            <span class="price-sort__title">Сортировка проектов по цене:</span>

            <div class="sort-method row-block align-center cheap" :class="{ selected: sortMethod === 'cheap' }" @click="selectSortMethod('cheap')">
              <ArrowSvg />
              <span class="sort-method__title">Дешевле</span>
            </div>

            <div
              class="sort-method row-block align-center expensive"
              :class="{ selected: sortMethod === 'expensive' }"
              @click="selectSortMethod('expensive')"
            >
              <ArrowSvg />
              <span class="sort-method__title">Дороже</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filters row-block full-width justify-between">
      <div class="row-block">
        <div v-if="sizes && sizes.length" class="sizes column-block">
          <span class="filters__title">По размеру</span>

          <div class="sizes-list row-block">
            <div v-for="(size, i) of sizes" :key="`${size.title}${i}`" class="filters-item row-block align-center">
              <div class="filters-input">
                <input
                  :id="`${size.title}${i}`"
                  v-model="models.sizes"
                  type="radio"
                  name="sizes"
                  :value="size.filter"
                  class="filters-input__input"
                  @change="changeFilterValue"
                />
                <TickSvg />
              </div>
              <label class="filters-item__title" :for="`${size.title}${i}`">{{ size.title }}</label>
            </div>
          </div>
        </div>

        <div class="floors column-block">
          <span class="filters__title">Этажность</span>

          <div class="floors-list column-block">
            <div v-for="(floor, i) of floors" :key="`${floor.title}${i}`" class="filters-item row-block align-center">
              <div class="filters-input">
                <input
                  :id="`${floor.title}${i}`"
                  v-model="models.floors"
                  :value="floor.filter"
                  type="radio"
                  name="floors"
                  class="filters-input__input"
                  @change="changeFilterValue"
                />
                <TickSvg />
              </div>
              <label class="filters-item__title" :for="`${floor.title}${i}`">{{ floor.title }}</label>
            </div>
          </div>
        </div>

        <div class="rooms column-block">
          <span class="filters__title">Комнаты</span>

          <div class="rooms-list row-block">
            <div v-for="(room, i) of rooms" :key="`${room.title}${i}`" class="filters-item row-block align-center">
              <div class="filters-input">
                <input
                  :id="`${room.title}${i}`"
                  v-model="models.rooms"
                  :value="room.filter"
                  type="radio"
                  name="rooms"
                  class="filters-input__input"
                  @change="changeFilterValue"
                />
                <TickSvg />
              </div>
              <label class="filters-item__title" :for="`${room.title}${i}`">{{ room.title }}</label>
            </div>
          </div>
        </div>

        <div class="areas column-block">
          <span class="filters__title">Площадь</span>

          <div class="areas-list column-block">
            <div v-for="(area, i) of areas" :key="`${area}${i}`" class="filters-item row-block align-center">
              <div class="filters-input">
                <input
                  :id="`${area.title}${i}`"
                  v-model="models.areas"
                  :value="area.filter"
                  type="radio"
                  name="area"
                  class="filters-input__input"
                  @change="changeFilterValue"
                />
                <TickSvg />
              </div>
              <label class="filters-item__title" :for="`${area.title}${i}`">{{ area.title }}</label>
            </div>
          </div>
        </div>

        <div v-if="specificities && specificities.length" class="specificities column-block">
          <span class="filters__title">Конструкция</span>

          <div class="specificities-list column-block">
            <div v-for="(item, i) of specificities" :key="`${item.title}${i}`" class="filters-item row-block align-center">
              <div class="filters-input">
                <input
                  :id="`${item.specificity}${i}`"
                  v-model="models.specificities"
                  :value="item.filter"
                  type="radio"
                  name="specificity"
                  class="filters-input__input"
                  @change="changeFilterValue"
                />
                <TickSvg />
              </div>
              <label class="filters-item__title" :for="`${item.title}${i}`">{{ item.title }}</label>
            </div>
          </div>
        </div>
      </div>

      <div v-if="priceSlider.length === 2" class="price column-block">
        <span class="filters__title">Стоимость, руб:</span>

        <div class="price-inputs row-block full-width justify-between">
          <div class="input-block row-block align-center">
            <span class="input-block__title">от</span>
            <input v-model="priceSlider[0]" type="text" maxlength="8" class="input-block__input" />
          </div>

          <div class="input-block row-block align-center">
            <span class="input-block__title">до</span>
            <input v-model="priceSlider[1]" type="text" maxlength="8" class="input-block__input" />
          </div>
        </div>

        <Slider v-model="priceSlider" :min="sliderBounds.min" :max="sliderBounds.max" :lazy="false" :tooltips="false" @change="inputPrice" />

        <div class="control-buttons row-block align-center">
          <div class="show">Показать</div>

          <div class="reset row-block align-center" @click="reset">
            <ResetSvg class="reset__icon" />
            <span class="reset__title">Сбросить</span>
          </div>
        </div>
      </div>
    </div>

    <div class="background column-block full-width align-center">
      <div class="elements row-block full-width">
        <div class="elements-container row-block">
          <div v-for="(item, i) of sortedElements" :key="`${i}${item.name_description}`" class="element column-block">
            <ImageSwiper :imgs="getImages(item.imgs)" :mark="item.name" />
            <div class="element-content">
              <NuxtLink class="element-content__title" :to="item.id.toString()" append>{{ item.name_description }}</NuxtLink>
              <div class="column-block">
                <div class="content-block row-block">
                  <span class="content-block__title">Площадь:&nbsp;</span>
                  <span class="content-block__value">{{ item.s }} м</span>
                </div>
                <div class="content-block row-block">
                  <span class="content-block__title">Размер:&nbsp;</span>
                  <span class="content-block__value">{{ item.size }}</span>
                </div>
                <div class="content-block row-block">
                  <span class="content-block__title">Комнат:&nbsp;</span>
                  <span class="content-block__value">{{ item.rooms || '?' }}</span>
                </div>
                <div class="content-block row-block">
                  <span class="content-block__title">Этажей:&nbsp;</span>
                  <span class="content-block__value">{{ item.floor }}</span>
                </div>

                <NuxtLink class="control-buttons row-block" :to="item.id.toString()" append>
                  <div class="buy">
                    <span class="buy__text">От&nbsp;</span>
                    <span class="buy__value">{{ formatNumber(item.price_1) }}</span>
                    <span class="buy__text">₽</span>
                  </div>

                  <div class="more full-height align-center">Подробнее</div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="element no-project column-block justify-between">
            <div class="column-block">
              <span class="no-project__title">Не нашли нужный проект?</span>
              <span class="no-project__text">Пришлите нам на расчет! Озвучим цену в течение дня.</span>
            </div>

            <div class="send full-width" @click="calcProject">Отправить</div>
          </div>
        </div>
      </div>

      <div class="pagination column-block align-center">
        <span class="pagination__title">Страницы</span>

        <template v-if="pageCount">
          <client-only>
            <Pagination :page-count="pageCount" :click-handler="setPage" :page-range="2" prev-text="←" next-text="→" container-class="row-block" />
          </client-only>
        </template>
      </div>
    </div>

    <div class="container full-width">
      <CalculatePrice />

      <div class="company-description">
        Компания Брусичъ занимается строительством деревянных домов в Москве и Московской области. В нашем каталоге представлены популярные проекты
        загородных коттеджей с различными вариантами планировки и отделки. В любой готовый проект наши специалисты бесплатно внесут необходимые правки
        или «с нуля» подготовят индивидуальный проект любой сложности. <br /><br />
        Строим зимние коттеджи и дачные дома из материалов собственного производства — профилированного бруса камерной сушки и пиломатериалов
        естественной влажности.
      </div>

      <div class="house-advantages column-block">
        <span class="house-advantages__title">Преимущества заказа строительства {{ headerReturnName }} в нашей компании</span>

        <ol>
          <li
            v-for="(item, i) of $options.advantages.filter((item) => item.id === category)"
            :key="`${i}${item.title}`"
            class="row-block align-center"
          >
            <div class="mark">{{ i + 1 }}</div>
            <div>
              <span class="bold">
                {{ item.title }}
              </span>
              {{ item.text }}
            </div>
          </li>
        </ol>
      </div>
    </div>

    <HouseEditor />
    <Questions />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import qs from 'qs';

import Slider from '@vueform/slider/dist/slider.vue2';
import getImages from '@/assets/mixins/getImages.js';

import housesConfig from '~/assets/config/houses';
import requestData from '~/assets/config/requestData';
import { createSizesFilter } from '~/assets/utils/filterFunctions';

import ArrowSvg from '~/assets/img/Category/arrow.svg';
import TickSvg from '~/assets/img/Category/tick.svg';
import ResetSvg from '~/assets/img/Category/reset.svg';

import APIRequest from '@/assets/utils/APIRequest';

export default {
  name: 'Category',
  components: { ArrowSvg, TickSvg, ResetSvg, Slider },
  titles: housesConfig.titles,
  mixins: [getImages],
  DEBOUNCE_TIMEOUT: 1600,
  transition: 'local-fade',

  advantages: [
    {
      id: 'doma-iz-brusa',
      title: 'Широкие возможности проектирования.',
      text: 'У нас можно заказать строительство дома из бруса любых размеров, начиная от небольшого одноэтажного дачного домика до двухэтажных загородных апартаментов внушительных размеров. Наши дома из бруса могут иметь мансарды, веранды, террасы, эркеры. Каждый наш заказчик может высказывать свои пожелания, которые обязательно учитываются в проекте, поэтому наши дома из бруса с полной уверенностью можно назвать уникальными.',
    },
    {
      id: 'doma-iz-brusa',
      title: 'Экологичность.',
      text: 'Особое внимание мы уделяем экологической чистоте возводимых деревянных домов. Для достижения 100% экологической безопасности мы строим дома исключительно из зимнего леса, который отличается экологичностью. Используем сухой пиломатериал и материал естественной влажности под усадку. С клееным брусом не работаем.',
    },
    {
      id: 4,
      title: '«Под ключ».',
      text: 'Мы относимся к категории строительных организаций, которые реализуют весь цикл строительства. В строительство дома из бруса под ключ входит архитектурно-инженерное проектирование с возможной 3D-визуализацией, комплектация, обустройство фундамента, непосредственное возведение деревянного дома, утепление, прокладка инженерных коммуникаций, декоративная отделка.',
    },
    {
      id: 'doma-iz-brusa',
      title: 'Оперативность.',
      text: 'Мы применяем эффективные технологии, поэтому обеспечиваем высокие темпы строительства домов из бруса. От возведения фундамента до сдачи готового дома в эксплуатацию проходит от 3 до 8 недель',
    },
    {
      id: 'doma-iz-brusa',
      title: 'Невысокая стоимость.',
      text: 'Мы сами занимаемся заготовкой древесины в лесу, распиловкой, сушкой на своем предприятии и строим только из своего пиломатериала. Работы по строительству домов из бруса проводятся штатными специалистами нашей компании, без привлечения мастеров со стороны. Все эти обстоятельства позитивно сказываются на качестве и цене строительства, которая на 15-20% ниже средней по столичному региону.',
    },
    {
      id: 'doma-pod-usadku',
      title: 'Два этапа.',
      text: ' В отличие от строений «под ключ» дома под усадку возводятся в два этапа. Вначале выполняются все капитальные работы, включающие обустройство фундамента, возведение стен монтаж перекрытий, создание стропильной системы, установка кровли. На время усадки влияют многие факторы, такие как сезонность проведения строительных работ, особенности климата местности, размеры строения, влажность бруса. После полной усадки строения, наши специалисты проводят монтаж чистового пола, прокладку инженерных коммуникаций в доме, установку оконных и дверных блоков, отделку.',
    },
    {
      id: 'doma-pod-usadku',
      title: '«Зимний лес»',
      text: 'Наша компания сама занимается лесозаготовками и подготовкой пиломатериалов. При этом для строительства домов из бруса под усадку мы используем исключительно зимний лес. Дом из такой древесины естественной влажности осаживается равномерно, плавно, без возникновения каких-либо негативных последствий. Мы гарантируем высокое качество и экологичность используемых для строительства домов под усадку материалов.',
    },
    {
      id: 'doma-pod-usadku',
      title: 'Технологии уменьшения последствий осаживания дома.',
      text: 'В каждом конкретном случае в зависимости от особенностей местности, где происходит строительство дома из бруса под усадку, а также специфики самого строения наши специалисты используют различные технологии, которые способствуют снижению до минимума негативных последствий усадки. Среди технологий, применяемых нами, принудительная осадка стен, использование высококачественного межвенцового утеплителя, устройство обсады, применение компенсаторов усадки.',
    },

    {
      id: 'karkasnie-doma',
      title: 'Прочность и отсутствие усадки.',
      text: 'Изготавливаемые нами несущие каркасы имеют высокие показатели прочности. Мы используем брус камерной сушки, заготовленный собственными силами. Его влажность не превышает 14%. Наши конструкции достаточно лёгкие, не требуют создания сложных фундаментов, не дают усадку, что позволяет возводить каркасные дома под ключ.',
    },

    {
      id: 'karkasnie-doma',
      title: 'Возможность строить в любое время года.',
      text: 'При строительстве каркасных домов не используются «мокрые» процессы, такие как склеивание, оштукатуривание, применение специальных строительных смесей, что позволяет строить в любое время года.',
    },

    {
      id: 'karkasnie-doma',
      title: 'Утепление.',
      text: 'Особое внимание мы уделяем утеплению каркасных домов. Наши специалисты собирают каркасы без зазоров и используют теплоизоляционный материал большой толщины. Это позволяет исключить теплопотери, не допустить появление конденсата и плесени. Возводимые нами каркасные дома тёплые и комфортные',
    },

    {
      id: 'karkasnie-doma',
      title: 'Вентиляция.',
      text: 'В каркасных домах, возводимых силами нашей компанией, в обязательном порядке обустраивается система вентиляции во всех помещениях. Мы предусматриваем вентиляцию, как через наружные стены, так и посредством вентиляционных каналов, выходящих на кровлю.',
    },

    {
      id: 'karkasnie-doma',
      title: 'Доступные цены.',
      text: 'Мы сами занимаемся лесозаготовками и подготовкой пиломатериалов. Строительные работы выполняются исключительно штатными специалистами нашей компании, без привлечения бригад со стороны. Всё это в совокупности позволяет нам устанавливать доступные цены на каркасные дома, которые на 15-20% ниже среднерыночных.',
    },

    {
      id: 'bani-iz-brusa',
      title: 'Русский стиль.',
      text: ' Наши строители и дизайнеры умеют удачно совмещать старинные банные традиции с современными технологиями. В итоге получаются добротные помещения и уникальные интерьеры, которые пользуются особым спросом у застройщиков. И независимо от выбранного проекта бани строения отличаются неповторимой стилистикой деревянного зодчества. Отличным вариантом является комплексное строительство на загородном участке дома из бруса и бани, выполненных в едином стиле.',
    },

    {
      id: 'bani-iz-brusa',
      title: 'Строительство бань из бруса под ключ.',
      text: 'Мы обеспечиваем комплексный подход к строительству бань из бруса, начиная с заготовки пиломатериалов и комплектации и заканчивая отделочными работами и сдачей готового объекта в эксплуатацию. Все работы проводятся штатными специалистами компании, имеющими достаточный опыт.',
    },

    {
      id: 'bani-iz-brusa',
      title: 'Большой выбор проектов.',
      text: 'Наши возможности позволяют реализовывать абсолютно любые проекты, начиная от небольших бюджетных брусовых бань до двухэтажных банных комплексов с просторными комнатами отдыха, парилками, купелями, бассейнами, спальнями, террасами. При этом проекты могут быть как типовыми, так и индивидуальными.',
    },

    {
      id: 'bani-iz-brusa',
      title: 'Высокие темпы, доступные цены.',
      text: 'Сама по себе технология строительства бань из бруса под ключ предполагает обустройство небольшого фундамента, неиспользование тяжёлой техники и практически отсутствие усадки. Всё это позитивно сказывается на оперативности проведения работ, стоимости строительства и позволяет нам давать в этом твёрдые гарантии.',
    },

    {
      id: 'bani-iz-brusa',
      title: 'Широкий географический охват.',
      text: 'Мы принимаем заказы на строительство бань из бруса в Москве, Московской области и абсолютно по всей территории европейской части Российской Федерации.',
    },

    {
      id: 'barnhausy',
      title: 'Широкий выбор конструктивных решений.',
      text: 'Несмотря на буквально взрывное развитие направления barn в загородном строительстве и появление ультрасовременных проектов домов, нашим специалистам удаётся сочетать в возводимых домах-барнхаусах уникальный ретро-стиль. Их отличает простота и естественность архитектурных решений, в которых создана комфортная для жизни гармоничная среда. Городских жителей привлекает в таких домах деревенский стиль, лаконичность форм, естественные цветовые оттенки, натуральная отделка, панорамное освещение, наличие террасы.',
    },

    {
      id: 'barnhausy',
      title: 'Безупречное качество и экологичность.',
      text: 'Мы сами занимаемся лесозаготовками и подготовкой материалов для строительства, поэтому гарантируем их высокое качество и экологичность. С клееным брусом, в структуре которого плотные слои клеевого состава, не работаем. Строительные работы проводятся исключительно штатными специалистами компании, имеющими достаточный опыт. Мастеров и бригад со стороны не привлекаем. Всё это позитивно сказывается на качестве строительства.',
    },

    {
      id: 'barnhausy',
      title: 'Высокие темпы.',
      text: 'В своей работе мы применяем быстровозводимые технологии, что позволяет поддерживать высокие темпы строительства. Обычно на возведение стандартного одноэтажного дома-барнхауса уходит от двух до четырёх месяцев.',
    },

    {
      id: 'barnhausy',
      title: 'Широкая география и доступная цена.',
      text: 'Мы сами занимаемся комплектацией строительства барнхаусов. Пиломатериалы свои, другие стройматериалы и оборудование мы получаем от производителей или их официально аккредитованных в Российской Федерации представителями. Всё это позволяет нам устанавливать цены на строительство барнхаусов на 15-20% ниже среднерыночных по региону. У нас можно заказать барнхаус как в Москве и Подмосковье, так и на всей территории европейской части России.',
    },
  ],

  data() {
    return {
      advantagesHeaders: ['дома из бруса', 'дома под усадку', 'каркасные дома', 'барнхаусы', 'бани из бруса'],
      currentPage: 1,
      sortMethod: null,
      sizes: [],
      specificities: [],
      transition: 'local-fade',
      pageCount: 0,
      floors: [
        { title: '1 этаж', filter: { floor: { floor: { $eq: '1' } } } },
        { title: '1 с мансардой', filter: { floor: { floor: { $eq: '1 с мансардой' } } } },
        { title: '1.5 этажа', filter: { floor: { floor: { $eq: '1,5' } } } },
        { title: '2 этажа', filter: { floor: { floor: { $eq: '2' } } } },
      ],
      rooms: [
        { title: '1', filter: { rooms: '1' } },
        { title: '2', filter: { rooms: '2' } },
        { title: '3', filter: { rooms: '3' } },
        { title: '4', filter: { rooms: '4' } },
        { title: '5', filter: { rooms: '5' } },
        { title: '6', filter: { rooms: '6' } },
        { title: '7', filter: { rooms: '7' } },
        { title: '8', filter: { rooms: '8' } },
      ],
      areas: [
        { title: 'До 50 кв.м', filter: { $and: [{ s: { $lt: 50 } }] } },
        { title: '50-100 кв.м', filter: { $and: [{ s: { $gt: 50 } }, { s: { $lt: 100 } }] } },
        { title: '100-150 кв.м', filter: { $and: [{ s: { $gt: 100 } }, { s: { $lt: 150 } }] } },
        { title: 'от 150 кв.м', filter: { $and: [{ s: { $gt: 150 } }] } },
      ],
      category: null,
      prices: null,
      priceSlider: [],
      elements: [],
      debounce: null,
      models: {
        sizes: null,
        floors: null,
        rooms: null,
        areas: null,
        specificities: null,
      },
    };
  },

  async fetch() {
    this.category = this.$route.params.category;
    if (!housesConfig.availableRoutes.includes(this.category)) this.$router.push('/');

    const currentFilters = this.filters[this.category];

    if (!(currentFilters && currentFilters.sizes && currentFilters.specificities && this.storePrices)) {
      this.initFilters(this.category);

      await Promise.all([this.fetchFilterType({ category: this.category, type: 'sizes', fields: ['size'] })]);

      this.specificities = housesConfig.specificitiesOptions[this.category] || housesConfig.specificitiesOptions.default;

      const prices = await housesConfig.limits.createRequest({
        cache: true,
        asynchronous: true,
        fields: requestData.limits.fields,
      });

      this.prices = prices;
      this.setPrices(prices);
    } else {
      this.sizes = currentFilters.sizes || [];
      this.specificities = currentFilters.specificities || [];
      this.prices = this.storePrices || [];
    }

    this.getQueryParams(false);
    const res = await this.buildElements(true);

    this.processHousesRequest(res);
  },

  computed: {
    ...mapState({
      filters: (state) => state.category.filters,
      storePrices: (state) => state.category.prices,
    }),

    sortedElements() {
      const elements = [...this.elements];

      if (this.sortMethod === 'expensive') {
        return elements.sort((a, b) => b.price_1 - a.price_1);
      } else {
        return elements.sort((a, b) => a.price_1 - b.price_1);
      }
    },

    sliderBounds() {
      if (!this.prices) return {};
      const limits = this.prices.find((el) => el.path === housesConfig.aliases[this.category]);
      if (!limits) return {};

      return {
        min: parseInt(limits.min),
        max: parseInt(limits.max),
      };
    },

    headerReturnName() {
      if (this.category === 'doma-pod-usadku') {
        return this.advantagesHeaders[1];
      } else if (this.category === 'doma-iz-brusa') {
        return this.advantagesHeaders[0];
      } else if (this.category === 'bani-iz-brusa') {
        return this.advantagesHeaders[4];
      } else if (this.category === 'karkasnie-doma') {
        return this.advantagesHeaders[2];
      } else if (this.category === 'barnhausy') {
        return this.advantagesHeaders[3];
      } else {
        return this.advantagesHeaders[3];
      }
    },
  },

  watch: {
    sortMethod() {
      this.putQueryString();
    },
  },

  methods: {
    ...mapMutations({
      setPrices: 'category/setPrices',
      setFilter: 'category/setFilter',
      initFilters: 'category/initFilters',
    }),

    calcProject() {
      this.$nuxt.$emit('set-modal', 'countProject');
    },

    changeFilterValue() {
      this.pageCount = 0;
      this.currentPage = 1;
      this.putQueryString();
      this.buildElements();
    },

    getQueryParams(build) {
      const filters = this.$route.query;

      for (const key of Object.keys(filters)) {
        if (key === 'sortMethod') {
          this.sortMethod = filters[key];
        }

        if (this.models[key] !== undefined) {
          if (filters[key] === '') continue;

          const model = this[key].find((el) => el.title === decodeURI(filters[key]));

          if (model == null) continue;

          this.models[key] = model.filter;
        }
      }

      if (filters.price && filters.price.length === 2) {
        filters.price = filters.price.map((el) => parseInt(el));

        if (filters.price.every((el) => typeof el === 'number')) {
          this.priceSlider = filters.price.map((el) => parseInt(el));
        }
      } else {
        this.priceSlider = [this.sliderBounds.min, this.sliderBounds.max];
      }

      if (build) this.buildElements();
    },

    inputPrice() {
      clearTimeout(this.debounce);

      this.putQueryString();

      this.debounce = setTimeout(this.buildElements, this.$options.DEBOUNCE_TIMEOUT);
    },

    putQueryString() {
      const keys = Object.keys(this.models);
      const filters = {};

      for (const key of keys) {
        if (!this.models[key]) continue;

        const filter = this[key].find((el) => el.filter === this.models[key]);
        filters[key] = filter.title;
      }

      if (this.sortMethod) {
        filters.sortMethod = this.sortMethod;
      }

      filters.price = this.priceSlider;

      history.replaceState(null, null, `?${qs.stringify(filters)}`);
    },

    reset() {
      for (const prop of Object.keys(this.models)) {
        this.models[prop] = null;
      }

      this.sortMethod = null;
      this.pageCount = 0;

      this.priceSlider = [this.sliderBounds.min, this.sliderBounds.max];
      this.putQueryString();

      this.buildElements();
    },

    setPage(page) {
      this.currentPage = page;
      this.buildElements();
    },

    selectSortMethod(method) {
      this.sortMethod = method;
    },

    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    },

    fetchFilterType({ category, type, filters = {}, fields = [], cache }) {
      return new Promise((resolve, reject) => {
        if (housesConfig[type][category]) {
          housesConfig[type][category].createRequest({
            callback: (res) => {
              const items = [];
              const key = Object.keys(res[0])[0];
              let processingFunction = null;

              switch (key) {
                case 'size': {
                  processingFunction = createSizesFilter;
                  break;
                }
              }

              for (let i = 0; i < res.length; i++) {
                items.push(processingFunction(res, i, key));
              }

              this.setFilter({ category, type, items });

              this[type] = items;
              resolve();
            },
            filters,
            fields,
            cache,
          });
        } else reject(new Error(`no API object for housesConfig[${type}][${category}]`));
      });
    },

    buildElements(asyncCall) {
      this.elements = [];

      const filters = {};

      for (const name of Object.keys(this.models)) {
        if (this.models[name] != null) {
          const key = Object.keys(this.models[name])[0];
          filters[key] = this.models[name][key];
        }
      }

      filters.$and = [
        {
          price_1: {
            $gte: this.priceSlider[0],
          },
        },

        {
          price_1: {
            $lte: this.priceSlider[1],
          },
        },
      ];

      if (this.models.areas != null) {
        filters.$and = [...filters.$and, ...this.models.areas.$and];
      }

      if (asyncCall) {
        return new Promise((resolve) => {
          APIRequest.staticRequest({
            path: housesConfig.houses[this.category].path,
            callback: resolve,
            filterResponse: false,
            filters,
            fields: requestData.houses.fields,
            populate: requestData.houses.populate,
            pagination: { ...requestData.houses.pagination, page: this.currentPage },
          });
        });
      }

      APIRequest.staticRequest({
        path: housesConfig.houses[this.category].path,
        callback: this.processHousesRequest,
        filterResponse: false,
        filters,
        fields: requestData.houses.fields,
        populate: requestData.houses.populate,
        pagination: { ...requestData.houses.pagination, page: this.currentPage },
      });
    },

    processHousesRequest(res) {
      if (!res.data.data.length) return;
      const pagination = res.data.meta.pagination;

      this.currentPage = pagination.page;
      this.pageCount = pagination.pageCount;

      const data = res.data.data.map((el) => ({ id: el.id, ...el.attributes, imgs: el.attributes.imgs.data }));

      this.elements = data;

      for (let i = 0; i < this.elements.length; i++) {
        if (this.elements[i].specificity) {
          this.elements[i].specificity = this.elements[i].specificity.data.map((el) => el.attributes.specificity);
        }

        if (this.elements[i].floor) {
          this.elements[i].floor = this.elements[i].floor.data.attributes.floor;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/css/mixin';
@import '~/assets/css/templates';

@include local-fade(0.2, local-fade);

.category {
  .background {
    background-color: #f8f8f8;
  }

  .all-categories {
    margin-top: vw(120px);

    &__title {
      @include font(Lato, 700, normal, vw(48px));
      color: #333333;
      margin-bottom: vw(35px);
    }
  }

  .sorting {
    margin-top: vw(120px);
    padding: 0 vw(162px) vw(50px) vw(162px);

    .route-path {
      @include font(Lato, 400, normal, vw(18px));
      color: rgba(#333333, 0.4);
    }

    .route-title {
      @include font(Lato, 700, normal, vw(48px));
      color: #333333;
      margin-top: vw(6px);
    }

    .price-sort {
      &__title {
        @include font(Lato, 400, normal, vw(24px));
        color: #333333;
      }

      .sort-method {
        margin-left: vw(50px);
        cursor: pointer;
        transition: transform ease 0.2s;

        &:hover:not(.selected) {
          transform: scale(1.03);
        }

        &.selected {
          svg {
            fill: #2cc37c;
          }

          .sort-method__title {
            color: #2cc37c;
          }
        }

        &:last-child svg {
          transform: rotate(180deg);
        }

        svg {
          width: vw(19px);
          fill: rgba(#333333, 0.4);
          margin-right: vw(10px);
          transition: fill ease 0.2s;
        }

        &__title {
          @include font(Lato, 400, normal, vw(24px));
          color: rgba(#333333, 0.4);
          transition: color ease 0.2s;
        }
      }
    }
  }

  .filters {
    padding: vh(50px) vw(162px) vw(80px) vw(162px);

    &__title {
      @include font(Lato, 700, normal, vh(20px));
      color: #333333;
    }

    .filters-input {
      @extend %content-center;

      &__input {
        appearance: none;
        width: vw(25px);
        height: vw(25px);
        border: vh(1px) solid rgba(51, 51, 51, 0.5);
        border-radius: vh(5px);
        transition: ease 0.2s;
        transition-property: background-color, border-color;

        &:checked {
          background-color: #2cc37c;
          border-color: #2cc37c;

          & + svg {
            opacity: 1;
          }
        }
      }

      svg {
        position: absolute;
        width: vh(11px);
        transition: opacity ease 0.2s;
        pointer-events: none;
      }
    }

    &-item__title {
      @include font(Lato, 400, normal, vw(18px));
      color: #333333;
      margin-left: vw(10px);
      white-space: nowrap;
    }

    .sizes {
      width: vw(320px);
      margin-right: vw(80px);

      .sizes-list {
        flex-wrap: wrap;
        margin-top: vh(30px);

        .filters-item {
          width: vw(77px);
          margin-right: vw(40px);
          margin-top: vh(20px);

          &:first-child,
          &:nth-child(2),
          &:nth-child(3) {
            margin-top: 0;
          }

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }

    .floors {
      &-list {
        margin-top: vh(30px);

        .filters-item {
          margin-top: vh(20px);

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }

    .rooms {
      width: vw(140px);
      margin-left: vw(80px);

      .rooms-list {
        flex-wrap: wrap;
        margin-top: vh(30px);

        .filters-item {
          width: vw(46px);
          margin-right: vw(40px);
          margin-top: vh(20px);

          &:first-child,
          &:nth-child(2) {
            margin-top: 0;
          }

          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }

    .areas {
      margin-left: vw(80px);

      &-list {
        margin-top: vh(30px);

        .filters-item {
          margin-top: vh(20px);

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }

    .specificities {
      margin-left: vw(80px);

      &-list {
        margin-top: vh(30px);

        .filters-item {
          margin-top: vh(20px);

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }

    .price {
      margin-left: vw(80px);
      width: vw(315px);
      --slider-height: #{vh(3px)};
      --slider-bg: rgba(51, 51, 51, 0.2);
      --slider-radius: 17px;
      --slider-handle-width: #{vh(20px)};
      --slider-handle-height: #{vh(20px)};
      --slider-handle-shadow: none;
      --slider-handle-ring-width: 0;
      --slider-handle-bg: #2cc37c;
      --slider-connect-bg: #2cc37c;

      .price-inputs {
        margin-top: vw(30px);
        margin-bottom: vw(30px);

        .input-block {
          &:last-child {
            margin-left: vw(10px);
          }

          &__title {
            @include font(Lato, 400, normal, vh(14px));
            margin-right: vw(10px);
          }

          &__input {
            @include font(Lato, 400, normal, vh(14px));
            width: vw(112px);
            height: vw(39px);
            border: vh(1px) solid rgba(51, 51, 51, 0.3);
            border-radius: vw(5px);
            text-align: center;
          }
        }
      }
    }

    .control-buttons {
      margin-top: vh(48px);

      .show {
        @include font(Lato, 400, normal, vh(14px));
        @extend %content-center;
        min-height: vh(47px);
        width: vh(164px);
        background-color: #f8f8f8;
        border-radius: vh(5px);
        cursor: pointer;
        transition: ease 0.2s;
        transition-property: background-color, color;

        &:hover {
          background-color: #2cc37c;
          color: white;
        }
      }

      .reset {
        margin-left: vh(21.62px);
        cursor: pointer;

        &:hover {
          .reset__icon {
            transform: rotate(-180deg);
          }
        }

        &__icon {
          width: vh(13.13px);
          height: vh(11.25px);
          transition: transform ease 0.2s;
        }

        &__title {
          @include font(Lato, 400, normal, vh(14px));
          margin-left: vw(6.25px);
        }
      }
    }
  }

  .elements {
    background-color: #f8f8f8;
    padding-top: vw(-51px);

    &-container {
      margin-top: vw(-51px);
      padding: 0 vw(162px);
      flex-wrap: wrap;

      .element {
        width: vw(472px);
        height: vw(729px);
        background-color: white;
        border-radius: vw(10px);
        overflow: hidden;
        margin-right: vw(85px);
        margin-top: vw(91px);

        &:nth-child(n + 1):nth-child(-n + 3) {
          margin-top: 0;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }

        .slide__picture {
          min-height: vw(305px);
        }

        .element-content {
          padding: vw(20px) vw(40px);

          &__title {
            @include font(Lato, 900, normal, vw(30px));
            display: flex;
            height: vw(84px);
            color: #333333 !important;
          }

          .content-block {
            margin-top: vw(20px);

            &__title {
              @include font(Lato, 500, normal, vw(22px));
              color: rgba(#333333, 0.5);
              line-height: vw(30.47px);
            }

            &__value {
              @include font(Lato, 500, normal, vw(22px));
              color: #333333;
              line-height: vw(30.47px);
            }
          }

          .control-buttons {
            margin-top: vw(30px);
            height: vw(59px);

            .buy {
              @extend %content-center;
              width: vw(197px);
              background-color: #f8f8f8;
              cursor: pointer;
              border-radius: vw(5px);

              &__text {
                @include font(Lato, normal, normal, vw(24px));
                color: #333333;
              }

              &__value {
                @include font(Lato, 900, normal, vw(24px));
                color: #333333;
              }
            }

            .more {
              @include font(Lato, 400, normal, vw(18px));
              margin-left: vw(20px);
              color: #333333;
              cursor: pointer;

              &::after {
                content: '';
                display: flex;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 4.47px 0 4.47px 4.47px;
                border-color: transparent transparent transparent #333333;
                margin-left: vw(16.61px);
              }
            }
          }
        }

        &.no-project {
          padding: vw(40px) vw(40px) vw(30px) vw(40px);
          position: relative;
          background: {
            image: url('~/assets/img/Home/houses-types/houses/template.jpg');
            size: cover;
            position: center;
            repeat: no-repeat;
          }

          &::after {
            @extend %absolute;
            content: '';
            display: flex;
            background-color: rgba(black, 0.45);
            width: 100%;
            height: 100%;
          }

          .no-project {
            &__title {
              @include font(Lato, 700, normal, vw(36px));
              color: white;
              position: relative;
              z-index: 2;
            }

            &__text {
              @include font(Lato, 400, normal, vw(22px));
              margin-top: vw(20px);
              color: white;
              line-height: vw(30.47px);
              position: relative;
              z-index: 2;
            }
          }

          .send {
            @include font(Lato, 400, normal, vw(22px));
            @extend %content-center;
            min-height: vw(64px);
            background-color: #f8f8f8;
            color: #333333;
            border-radius: 5px;
            position: relative;
            z-index: 2;
            cursor: pointer;
          }
        }
      }
    }
  }

  .pagination {
    margin-top: vw(50px);
    padding-bottom: vw(50px);

    &__title {
      @include font(Lato, 400, normal, vw(18px));
      color: #333333;
    }

    ul {
      display: flex;
      align-items: center;
      margin-top: vw(20px);

      &::v-deep li {
        list-style: none;
        margin-right: vw(40px);

        &:first-child,
        &:last-child {
          @extend %content-center;
          display: flex;
          width: vw(35px);
          height: vw(35px);
          border-radius: 50%;
          background-color: white;
          cursor: pointer;
          transition: background-color ease 0.2s;

          &:hover {
            background-color: #2cc37c;

            a {
              color: white;
            }
          }

          a {
            @include font(Consolas, normal, normal, vw(20px));
            @extend %content-center;
            display: flex;
            width: inherit;
            height: inherit;
          }
        }

        &:last-child {
          margin-right: 0;
        }

        &.active a {
          color: #333333;
        }

        a {
          @include font(Lato, 400, normal, vw(30px));
          color: rgba(#333333, 0.4);
          transition: color ease 0.2s;
        }
      }
    }
  }

  .container {
    margin-top: vw(40px);
    padding: 0 vw(162px);

    .company-description {
      @include font(Lato, 400, normal, vw(24px));
      color: rgba(#333333, 0.5);
      margin-top: vh(100px);
    }

    .house-advantages {
      margin-top: vh(100px);

      &__title {
        @include font(Lato, 900, normal, vw(48px));
        color: #333333;
      }

      ol {
        margin-top: vh(60px);

        li {
          @include font(Lato, normal, normal, vw(24px));
          list-style-type: none;
          margin-top: vw(30px);
          color: #333333;

          &:first-child {
            margin-top: 0;
          }

          .mark {
            @include font(Lato, normal, normal, vw(18px));
            @extend %content-center;
            color: white;
            background-color: #2cc37c;
            min-width: vw(30px);
            height: vw(30px);
            border-radius: 50%;
            margin-right: vw(20px);
          }

          .bold {
            @include font(Lato, 900, normal, vw(24px));
          }
        }
      }
    }
  }
}
</style>
