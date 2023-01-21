(() => {
  // //////////////////////////////////////////////////////////////////

  const URL = "localhost:3000";
  const API_CLIENTS = "/api/clients";
  const CLIENTS = {
    arr: [],
    filterArr: [],
    filterValue: null,
  };

  const body = document.querySelector("body");

  const headerInput = document.querySelector("#headerInput");

  const tableHead = document.querySelector("#tableHead");
  const tableBody = document.querySelector("#tableBody");

  const modalContainer = document.querySelector(".modal__container");
  const icons = {
    pen: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" opacity="0.7" d="M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329Z" fill="#9873FF"/>
      </svg>
      `,
    delete: `<svg width="13" height="13" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
      </svg>
      `,
    addClient: `<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/>
      </svg>
      `,
    vk: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
      </svg>
      `,
    fb: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
      </svg>
      `,
    phone: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.7" cx="8" cy="8" r="8" fill="#9873FF"/>
      <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
      </svg>
      `,
    mail: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
      </svg>
      `,
    user: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
      </svg>
      `,
    circle: `<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M4.00025 40.0005C4.00025 59.8825 20.1182 76.0005 40.0002 76.0005C59.8822 76.0005 76.0002 59.8825 76.0002 40.0005C76.0002 20.1185 59.8823 4.00049 40.0003 4.00049C35.3513 4.00048 30.9082 4.88148 26.8282 6.48648" stroke="#9873FF" stroke-width="8" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>
      `,
    closeBtn: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0"/>
      </svg>
      `,
    plus: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M7.99998 4.66683C7.63331 4.66683 7.33331 4.96683 7.33331 5.3335V7.3335H5.33331C4.96665 7.3335 4.66665 7.6335 4.66665 8.00016C4.66665 8.36683 4.96665 8.66683 5.33331 8.66683H7.33331V10.6668C7.33331 11.0335 7.63331 11.3335 7.99998 11.3335C8.36665 11.3335 8.66665 11.0335 8.66665 10.6668V8.66683H10.6666C11.0333 8.66683 11.3333 8.36683 11.3333 8.00016C11.3333 7.6335 11.0333 7.3335 10.6666 7.3335H8.66665V5.3335C8.66665 4.96683 8.36665 4.66683 7.99998 4.66683ZM7.99998 1.3335C4.31998 1.3335 1.33331 4.32016 1.33331 8.00016C1.33331 11.6802 4.31998 14.6668 7.99998 14.6668C11.68 14.6668 14.6666 11.6802 14.6666 8.00016C14.6666 4.32016 11.68 1.3335 7.99998 1.3335ZM7.99998 13.3335C5.05998 13.3335 2.66665 10.9402 2.66665 8.00016C2.66665 5.06016 5.05998 2.66683 7.99998 2.66683C10.94 2.66683 13.3333 5.06016 13.3333 8.00016C13.3333 10.9402 10.94 13.3335 7.99998 13.3335Z" fill="#9873FF"/>
      </svg>
      `,
    btnDelete: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/>
      </svg>
      `,
    loadingChange: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>
      `,
    loadingDelete: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path  opacity="0.7" d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#F06A4D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
      </svg>
      `,
    sortArrow: `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/>
    </svg>
    `,
  };

  const loading = createTableLoad();

  async function request(user) {
    const response = user
        ? await fetch(`http://${URL}${API_CLIENTS}`, {
            method: "POST",
            body: JSON.stringify({
              name: user.name,
              surname: user.surname,
              lastName: user.lastName,
              contacts: user.contacts,
            }),
          })
        : await fetch(`http://${URL}${API_CLIENTS}`),
      data = await response.json();

    return data;
  }

  async function requestSearch(query) {
    const response = await fetch(`http://${URL}${API_CLIENTS}?search=${query}`),
      data = await response.json();

    return data;
  }

  async function requestSettings(method, id, user) {
    const response = user
        ? await fetch(`http://${URL}${API_CLIENTS}/${id}`, {
            method: method,
            body: JSON.stringify({
              name: user.name,
              surname: user.surname,
              lastName: user.lastName,
              contacts: user.contacts,
            }),
          })
        : await fetch(`http://${URL}${API_CLIENTS}/${id}`, {
            method: method,
          }),
      data = await response.json();

    return data;
  }

  function createElem(element, options, parent) {
    const tag = document.createElement(element);
    for (const key in options) {
      if (key === "classList") {
        for (const e of options[key]) tag.classList.add(e);
        continue;
      }
      if (key === "dataset")
        tag.dataset[options[key].dataName] = options[key].dataValue;
      if (key === "style")
        tag.style[options[key].dataName] = options[key].dataValue;
      tag[key] = options[key];
    }
    if (parent) parent.append(tag);
    return tag;
  }

  function loadRotation(element) {
    gsap.to(element, {
      duration: 1,
      rotation: 360,
      repeat: -1,
    });
  }

  function stringSplit(dateValue) {
    const date = new Date(dateValue),
      day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1,
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes =
        date.getMinutes() + 1 < 10
          ? "0" + (date.getMinutes() + 1)
          : date.getMinutes() + 1,
      data = {
        setFullDate: `${day}.${month}.${year}`,
        setFullTime: `${hours}:${minutes}`,
      };
    return data;
  }

  async function filterUsers(copyArray, config) {
    if (config) {
      if (CLIENTS.filterValue) {
        return (copyArray = copyArray.filter((item) => {
          const str = `${item.surname} ${item.name} ${item.lastName}`;
          return str.toLowerCase().includes(CLIENTS.filterValue.toLowerCase());
        }));
      } else return copyArray;
    }

    if (CLIENTS.filterValue) {
      const response = await requestSearch(CLIENTS.filterValue);
      return (CLIENTS.filterArr = [...response]);
    } else return copyArray;
  }

  function sortUsers(copyArr, prop, dir) {
    switch (prop) {
      case "headId":
        copyArr.sort((rowA, rowB) => {
          return (dir ? rowA.id > rowB.id : rowA.id < rowB.id) ? -1 : 1;
        });
        break;

      case "headName":
        copyArr.sort((rowA, rowB) => {
          return (
            dir
              ? rowA.surname + rowA.name + rowA.lastName >
                rowB.surname + rowB.name + rowB.lastName
              : rowA.surname + rowA.name + rowA.lastName <
                rowB.surname + rowB.name + rowB.lastName
          )
            ? -1
            : 1;
        });
        break;

      case "headCreate":
        copyArr.sort((rowA, rowB) => {
          return (
            dir
              ? rowA.createdAt > rowB.createdAt
              : rowA.createdAt < rowB.createdAt
          )
            ? -1
            : 1;
        });
        break;

      case "headChange":
        copyArr.sort((rowA, rowB) => {
          return (
            dir
              ? rowA.updatedAt > rowB.updatedAt
              : rowA.updatedAt < rowB.updatedAt
          )
            ? -1
            : 1;
        });
        break;
    }
  }

  function headerSearch() {
    let timeoutRender = null;

    headerInput.addEventListener("input", () => {
      clearTimeout(timeoutRender);
      function valueRender() {
        CLIENTS.filterValue = headerInput.value;
        render(CLIENTS.arr);
        return;
      }
      timeoutRender = setTimeout(valueRender, 300);
    });
  }

  function createTableHead() {
    const tablerow = createElem("tr", {
      classList: ["clients__table-head-row"],
    });

    const tableColId = createElem(
      "th",
      {
        classList: ["clients__table-head-col", "clients__table-head-col--id"],
      },
      tablerow
    );
    const headIdBtn = createElem(
      "button",
      {
        innerHTML: `ID ${icons.sortArrow}`,
        classList: ["clients__table-head-btn", "sorting"],
        id: "headId",
      },
      tableColId
    );

    const tableColName = createElem(
      "th",
      {
        classList: ["clients__table-head-col", "clients__table-head-col--name"],
      },
      tablerow
    );
    const headNameBtn = createElem(
      "button",
      {
        innerHTML: `Фамилия Имя Отчество ${icons.sortArrow}`,
        classList: ["clients__table-head-btn"],
        id: "headName",
      },
      tableColName
    );
    const headNameSort = createElem(
      "span",
      {
        classList: ["clients__table-head-sort"],
        textContent: "А-Я",
      },
      headNameBtn
    );

    const tableColCreate = createElem(
      "th",
      {
        classList: [
          "clients__table-head-col",
          "clients__table-head-col--create",
        ],
      },
      tablerow
    );
    const headCreateBtn = createElem(
      "button",
      {
        innerHTML: `Дата и время создания ${icons.sortArrow}`,
        classList: ["clients__table-head-btn"],
        id: "headCreate",
      },
      tableColCreate
    );

    const tableColChange = createElem(
      "th",
      {
        classList: [
          "clients__table-head-col",
          "clients__table-head-col--change",
        ],
      },
      tablerow
    );
    const headChangeBtn = createElem(
      "button",
      {
        innerHTML: `Последние изменения ${icons.sortArrow}`,
        classList: ["clients__table-head-btn"],
        id: "headChange",
      },
      tableColChange
    );

    const headContacts = createElem(
      "th",
      {
        classList: [
          "clients__table-head-col",
          "clients__table-head-col--contact",
        ],
      },
      tablerow
    );
    const headContactsTxt = createElem(
      "span",
      {
        textContent: "Контакты",
        classList: ["clients__table-head-btn"],
      },
      headContacts
    );

    const headDoing = createElem(
      "th",
      {
        classList: [
          "clients__table-head-col",
          "clients__table-head-col--doing",
        ],
      },
      tablerow
    );
    const headDoingTxt = createElem(
      "span",
      {
        textContent: "Действия",
        classList: ["clients__table-head-btn"],
      },
      headDoing
    );

    const tableHeadBtns = [
      headIdBtn,
      headNameBtn,
      headCreateBtn,
      headChangeBtn,
    ];

    function eventClickBtn(select) {
      const selectIcon = select.childNodes[1];
      if (select.classList.contains("sorting")) {
        gsap.to(selectIcon, { rotation: 180, duration: 0.5 });
      }

      select.addEventListener("click", () => {
        let dir = null;

        if (select.classList.contains("sorting")) {
          select.classList.toggle("reverse");
          if (select.id === "headName") {
            const sortTxt = Array.from(headNameSort.textContent);
            headNameSort.textContent = sortTxt.reverse().join("");
          }
          gsap.to(selectIcon, { rotation: 180, duration: 0.5 });
        } else {
          tableHeadBtns.forEach((btn) => {
            btn.classList.remove("reverse", "sorting");
            gsap.to(btn.childNodes[1], { rotation: 0, duration: 0.5 });
          });
          select.classList.add("sorting");
          gsap.to(selectIcon, { rotation: 180, duration: 0.5 });
        }

        if (select.classList.contains("reverse")) {
          dir = true;
          gsap.to(selectIcon, { rotation: 0, duration: 0.5 });
        } else dir = false;

        render(CLIENTS.arr, true, select.id, dir);
      });

      return;
    }

    tableHeadBtns.forEach((btn) => {
      eventClickBtn(btn);
    });

    return tablerow;
  }

  function createTableLoad() {
    const tableLoad = createElem("tr", {
        classList: ["clients__table-body-row"],
      }),
      tableLoadCol = createElem(
        "td",
        {
          classList: ["clients__table-body-col"],
          colSpan: "6",
          height: "300",
        },
        tableLoad
      ),
      tableLoadIcon = createElem(
        "span",
        { classList: ["clients__table-body-icon"], innerHTML: icons.circle },
        tableLoadCol
      );

    loadRotation(tableLoadIcon);

    return tableLoad;
  }

  function createTableRow(user) {
    const tablerow = createElem("tr", {
      classList: ["clients__table-body-row"],
    });

    const tableColId = createElem(
      "td",
      {
        classList: ["clients__table-body-col", "clients__table-body-col--id"],
      },
      tablerow
    );
    const userId = createElem(
      "span",
      {
        classList: ["clients__table-body-content"],
        textContent: user.id,
      },
      tableColId
    );

    const tableColName = createElem(
      "td",
      {
        classList: ["clients__table-body-col", "clients__table-body-col--name"],
      },
      tablerow
    );
    const userName = createElem(
      "span",
      {
        classList: ["clients__table-body-content"],
        textContent: `${user.surname} ${user.name} ${user.lastName}`,
      },
      tableColName
    );

    const tableColCreate = createElem(
      "td",
      {
        classList: [
          "clients__table-body-col",
          "clients__table-body-col--create",
        ],
      },
      tablerow
    );
    const userCreateDate = createElem(
      "span",
      {
        classList: ["clients__table-body-content"],
        textContent: stringSplit(user.createdAt).setFullDate,
      },
      tableColCreate
    );
    const userCreateTime = createElem(
      "span",
      {
        textContent: stringSplit(user.createdAt).setFullTime,
      },
      userCreateDate
    );

    const tableColChange = createElem(
      "td",
      {
        classList: [
          "clients__table-body-col",
          "clients__table-body-col--change",
        ],
      },
      tablerow
    );
    const userChangeDate = createElem(
      "span",
      {
        classList: ["clients__table-body-content"],
        textContent: stringSplit(user.updatedAt).setFullDate,
      },
      tableColChange
    );
    const userChangeTime = createElem(
      "span",
      {
        textContent: stringSplit(user.updatedAt).setFullTime,
      },
      userChangeDate
    );

    const tableColContacts = createElem(
      "td",
      {
        classList: [
          "clients__table-body-col",
          "clients__table-body-col--contact",
        ],
      },
      tablerow
    );
    const userContactsList = createElem(
      "ul",
      {
        classList: ["clients__table-body-contacts"],
      },
      tableColContacts
    );

    const tableColDoing = createElem(
      "td",
      {
        classList: [
          "clients__table-body-col",
          "clients__table-body-col--doing",
        ],
      },
      tablerow
    );
    const userDoing = createElem(
      "div",
      {
        classList: ["clients__table-body-doing"],
      },
      tableColDoing
    );
    const userDoingChange = createElem(
      "button",
      {
        classList: ["clients__table-body-doing-btn"],
        innerHTML: `${icons.pen}Изменить`,
      },
      userDoing
    );
    const userDoingDelete = createElem(
      "button",
      {
        classList: ["clients__table-body-doing-btn"],

        innerHTML: `${icons.delete}Удалить`,
      },
      userDoing
    );

    userDoingChange.addEventListener("click", async () => {
      userDoingChange.innerHTML = `${icons.loadingChange}Изменить`;
      loadRotation(userDoingChange.childNodes[0]);
      const client = await requestSettings("GET", user.id);
      userDoingChange.innerHTML = `${icons.pen}Изменить`;
      body.classList.add("stop");
      let modal = createModalForm(false, client);
      modalContainer.append(modal.modalForm);
    });

    userDoingDelete.addEventListener("click", async () => {
      userDoingDelete.innerHTML = `${icons.loadingDelete}Удалить`;
      loadRotation(userDoingDelete.childNodes[0]);
      const client = await requestSettings("GET", user.id);
      userDoingDelete.innerHTML = `${icons.delete}Удалить`;
      body.classList.add("stop");
      const deleteModal = createModalDelete(client);
      modalContainer.append(deleteModal.modalForm);
    });

    function createContacts() {
      for (const contact of user.contacts) {
        let socialNetwork = null;
        let socialLabel = null;
        let url = contact.value;
        let content = `${contact.type}: ${contact.value}`;
        let targetValue = "_blank";

        function validatePhone(tel) {
          const data = `${tel.substr(0, 2)} (${tel.substr(2, 3)}) ${tel.substr(
            5,
            3
          )}-${tel.substr(8, 2)}-${tel.substr(10, 2)}`;
          return data;
        }

        switch (contact.type) {
          case "Телефон":
            socialNetwork = icons.phone;
            socialLabel = "Телефон";
            url = `tel:${contact.value}`;
            content = validatePhone(contact.value);
            targetValue = "_self";
            break;
          case "Email":
            socialNetwork = icons.mail;
            socialLabel = "Почта";
            url = `mailto:${contact.value}`;
            break;
          case "Facebook":
            socialNetwork = icons.fb;
            socialLabel = "Фейсбук";
            break;
          case "Vk":
            socialNetwork = icons.vk;
            socialLabel = "Вконтакте";
            break;
          default:
            socialNetwork = icons.user;
            socialLabel = "Социальная сеть";
            break;
        }

        const contactItem = createElem(
          "li",
          {
            classList: ["clients__table-body-contact"],
          },
          userContactsList
        );

        const contactLink = createElem(
          "a",
          {
            innerHTML: socialNetwork,
            ariaLabel: socialLabel,
            classList: ["clients__table-body-contact-link"],
            href: url,
            target: targetValue,
          },
          contactItem
        );

        tippy(contactLink, {
          content: content,
        });

        --contactsAmount;
        if (contactsAmount === 0) break;
      }
    }

    if (user.contacts.length > 5) {
      contactsAmount = 4;
      let contactsOpen = contactsAmount;
      createContacts();
      const i = user.contacts.length - contactsOpen;

      const contactItem = createElem(
        "li",
        {
          classList: ["clients__table-body-contact"],
        },
        userContactsList
      );
      const contactLinkLimit = createElem(
        "button",
        {
          textContent: `+${i}`,
          ariaLabel: "Показать остальные социальные сети",
          classList: ["clients__table-body-contact-limit"],
        },
        contactItem
      );

      tippy(contactLinkLimit, {
        content: "Показать оставшиеся контакты",
      });

      contactLinkLimit.addEventListener("click", () => {
        contactsAmount = user.contacts.length;
        userContactsList.innerHTML = "";
        createContacts();
      });
    } else {
      contactsAmount = user.contacts.length;
      createContacts();
    }

    return tablerow;
  }

  function createAddClientButton() {
    const modalAdd = createElem("div", {
      classList: ["modal__add"],
    });

    const buttonAddClient = createElem(
      "button",
      {
        classList: ["modal__add-btn"],
        innerHTML: `${icons.addClient} Добавить клиента`,
      },
      modalAdd
    );

    buttonAddClient.addEventListener("click", () => {
      let modal = createModalForm(true);
      modalContainer.append(modal.modalForm);
      body.classList.add("stop");
    });

    return modalAdd;
  }

  function createModal() {
    const modalForm = createElem("div", {
      classList: ["modal__form"],
    });
    const modalFormOverlay = createElem(
      "div",
      {
        classList: ["modal__form-overlay"],
      },
      modalForm
    );
    const modalFormBlock = createElem(
      "div",
      {
        classList: ["modal__form-block"],
      },
      modalFormOverlay
    );
    const modalFormClose = createElem(
      "button",
      {
        classList: ["modal__form-close"],
        innerHTML: icons.closeBtn,
        ariaLabel: "Закрыть окно",
      },
      modalFormBlock
    );

    const modalOpen = gsap.timeline();
    modalOpen
      .fromTo(
        modalFormOverlay,
        { duration: 0.3, opacity: 0 },
        { duration: 0.3, opacity: 1 }
      )
      .fromTo(
        modalFormBlock,
        { duration: 0.3, opacity: 0, yPercent: -100, scale: 0.5 },
        { duration: 0.3, opacity: 1, yPercent: 0, scale: 1 }
      );

    function removeModal() {
      modalForm.remove();
      body.classList.remove("stop");
    }

    document.addEventListener("click", function (missClick) {
      if (
        !missClick.target.classList.contains("modal__form-block") &&
        missClick.target.classList.contains("modal__form-overlay")
      ) {
        setTimeout(removeModal, 500);
        modalOpen.reverse();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.code == "Escape") {
        setTimeout(removeModal, 500);
        modalOpen.reverse();
      }
    });

    modalFormClose.addEventListener("click", () => {
      setTimeout(removeModal, 500);
      modalOpen.reverse();
    });

    return { modalForm, modalFormBlock, modalOpen };
  }

  function createModalForm(add, client) {
    const modalBlock = createModal();

    const form = createElem(
      "form",
      {
        classList: ["modal__form-form"],
        action: "#",
      },
      modalBlock.modalFormBlock
    );

    const formHeading = createElem(
      "h2",
      {
        classList: ["modal__form-heading"],
        textContent: add ? "Новый клиент" : "Изменить данные",
      },
      form
    );
    const formId = add
      ? null
      : createElem(
          "span",
          {
            classList: ["modal__form-id"],
            textContent: `ID: ${client.id}`,
          },
          formHeading
        );

    const formSurnameRow = createElem(
      "div",
      {
        classList: ["modal__form-row"],
      },
      form
    );
    const formSurnameLabel = createElem(
      "label",
      {
        classList: ["modal__form-label"],
        for: "surname",
        textContent: "Фамилия",
      },
      formSurnameRow
    );
    const formSurnameLabelIcon = createElem(
      "span",
      {
        textContent: "*",
      },
      formSurnameLabel
    );
    const formSurnameInput = createElem(
      "input",
      {
        classList: ["modal__form-input"],
        type: "text",
        value: client ? client.surname : null,
        required: true,
        id: "surname",
      },
      formSurnameRow
    );

    const formNameRow = createElem(
      "div",
      {
        classList: ["modal__form-row"],
      },
      form
    );
    const formNameLabel = createElem(
      "label",
      {
        classList: ["modal__form-label"],
        for: "name",
        textContent: "Имя",
      },
      formNameRow
    );
    const formNameLabelIcon = createElem(
      "span",
      {
        textContent: "*",
      },
      formNameLabel
    );
    const formNameInput = createElem(
      "input",
      {
        classList: ["modal__form-input"],
        type: "text",
        value: client ? client.name : null,
        required: true,
        id: "name",
      },
      formNameRow
    );

    const formLastNameRow = createElem(
      "div",
      {
        classList: ["modal__form-row"],
      },
      form
    );
    const formLastNameLabel = createElem(
      "label",
      {
        classList: ["modal__form-label"],
        for: "lastName",
        textContent: "Отчество",
      },
      formLastNameRow
    );
    const formLastNameInput = createElem(
      "input",
      {
        classList: ["modal__form-input"],
        type: "text",
        value: client ? client.lastName : null,
        id: "lastName",
      },
      formLastNameRow
    );

    function labelAnimation(label, input) {
      const formInput = gsap.timeline({ paused: true });
      formInput.fromTo(
        label,
        { duration: 0.3, scale: 1, y: 17 },
        { duration: 0.3, scale: 0.7, y: 0 }
      );

      if (input.value.length > 0) {
        formInput.play();
      }

      input.addEventListener("input", () => {
        formInput.play();
      });
    }

    labelAnimation(formSurnameLabel, formSurnameInput);
    labelAnimation(formNameLabel, formNameInput);
    labelAnimation(formLastNameLabel, formLastNameInput);

    const formContacts = createElem(
      "div",
      {
        classList: ["modal__form-contacts"],
      },
      form
    );

    const formContactsAdd = createElem(
      "button",
      {
        classList: ["modal__form-contacts-btn"],
        type: "button",
        innerHTML: `${icons.plus} Добавить контакт`,
      },
      formContacts
    );

    const contactList = createContactList();
    formContacts.prepend(contactList);

    let i = 0;

    if (client) {
      for (const contact of client.contacts) {
        const contactItem = createContactItem(contact);
        contactList.append(contactItem);

        i++;
      }
    }

    function addMargin() {
      if (contactList.childNodes.length > 0) {
        formContactsAdd.style.marginBottom = "17px";
      } else {
        formContactsAdd.style.marginBottom = "0";
      }
    }

    addMargin();

    function overflowCheck(el, parent) {
      if (i > 9) el.remove();
      else parent.append(el);
    }

    overflowCheck(formContactsAdd, formContacts);

    function createContactList() {
      const formContactsList = createElem("ul", {
        classList: ["modal__form-contacts-list"],
      });
      return formContactsList;
    }

    function createContactItem(contact) {
      const valueTel = "Телефон";
      const valueEmail = "Email";
      const valueFacebook = "Facebook";
      const valueVk = "Vk";
      const valueAnother = "Доп. телефон";

      const contactItem = createElem("li", {
        classList: ["modal__form-contacts-item"],
      });

      const select = createElem(
        "select",
        {
          classList: ["js-choice"],
        },
        contactItem
      );
      const optionTel = createElem(
        "option",
        {
          textContent: valueTel,
          value: valueTel,
          selected: contact && contact.type === valueTel ? true : false,
        },
        select
      );
      const optionAnother = createElem(
        "option",
        {
          textContent: valueAnother,
          value: valueAnother,
          selected: contact && contact.type === valueAnother ? true : false,
        },
        select
      );
      const optionEmail = createElem(
        "option",
        {
          textContent: valueEmail,
          value: valueEmail,
          selected: contact && contact.type === valueEmail ? true : false,
        },
        select
      );
      const optionVk = createElem(
        "option",
        {
          classList: ["contact__option"],
          textContent: valueVk,
          value: valueVk,
          selected: contact && contact.type === valueVk ? true : false,
        },
        select
      );
      const optionFacebook = createElem(
        "option",
        {
          textContent: valueFacebook,
          value: valueFacebook,
          selected: contact && contact.type === valueFacebook ? true : false,
        },
        select
      );

      const label = createElem(
        "label",
        {
          classList: ["modal__form-contacts-label"],
        },
        contactItem
      );

      const input = createElem(
        "input",
        {
          classList: ["modal__form-contacts-input"],
          placeholder: "Введите данные контакта",
          value: contact && contact.value ? contact.value : null,
        },
        label
      );

      const btnClose = createElem(
        "button",
        {
          classList: ["modal__form-contacts-delete"],
          ariaLabel: "Удалить контакт",
          innerHTML: icons.btnDelete,
        },
        contactItem
      );
      btnClose.addEventListener("click", () => {
        contactItem.remove();
        i--;
        overflowCheck(formContactsAdd, formContacts);
        addMargin();
      });

      const choices = new Choices(select, {
        itemSelectText: "",
        allowHTML: true,
      });

      return contactItem;
    }

    formContactsAdd.addEventListener("click", () => {
      const createContacItem = add
        ? createContactItem()
        : createContactItem(client.contacts);
      contactList.append(createContacItem);
      i++;
      addMargin();
      overflowCheck(formContactsAdd, formContacts);
    });

    const formBtns = createElem(
      "div",
      {
        classList: ["modal__form-btns"],
      },
      form
    );
    const saveBtn = createElem(
      "button",
      {
        classList: ["modal__form-submit"],
        type: "submit",
        textContent: "Сохранить",
      },
      formBtns
    );
    const deleteBtn = createElem(
      "button",
      {
        classList: ["modal__form-delete"],
        type: "button",
      },
      formBtns
    );
    const deleteBtnText = createElem(
      "u",
      {
        textContent: add ? "Отмена" : "Удалить клиента",
      },
      deleteBtn
    );

    const formInputs = [formNameInput, formSurnameInput];
    for (const input of formInputs) {
      input.addEventListener("input", function (event) {
        if (input.validity.valid) {
          input.classList.remove("invalid-value");
        } else {
          input.classList.add("invalid-value");
        }
      });
    }

    saveBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const data = {
        surname: formSurnameInput.value,
        name: formNameInput.value,
        lastName: formLastNameInput.value,
        contacts: [],
      };

      form.querySelectorAll(".modal__form-contacts-item").forEach((e) => {
        const contact = {
          type: e.querySelector("select").value,
          value: e.querySelector(".modal__form-contacts-input").value,
        };
        data.contacts.push(contact);
      });

      const responseSubmit = add
        ? await request(data)
        : await requestSettings("PATCH", client.id, data);

      for (const input of formInputs) {
        input.classList.remove("invalid-value");
        if (!input.validity.valid) {
          input.classList.add("invalid-value");
        }
      }

      if (responseSubmit.errors) {
        const errorElem = document.querySelector(".error");
        if (errorElem) errorElem.remove();
        createErrorsMessage(responseSubmit.errors);
      } else if (responseSubmit) {
        setTimeout(() => {
          modalBlock.modalForm.remove();
          body.classList.remove("stop");
        }, 500);
        modalBlock.modalOpen.reverse();

        const response = await request();

        tableBody.innerHTML = "";
        tableBody.append(loading);
        CLIENTS.arr = response;
        render(CLIENTS.arr);
      } else {
        const errorElem = document.querySelector(".error");
        if (errorElem) errorElem.remove();
        createErrorsMessage(["Что-то пошло не так..."]);
      }
    });

    deleteBtn.addEventListener("click", () => {
      setTimeout(() => {
        modalBlock.modalForm.remove();
        body.classList.remove("stop");
      }, 500);
      modalBlock.modalOpen.reverse();
      if (!add) {
        const deleteModal = createModalDelete(client);
        modalContainer.append(deleteModal.modalForm);
      }
    });

    function createErrorsMessage(errors) {
      const errorBlock = createElem("div", {
        classList: ["error"],
      });
      for (const error of errors) {
        const errorMessage = createElem(
          "p",
          {
            classList: ["error__text"],
            textContent: error.message,
          },
          errorBlock
        );
      }
      saveBtn.before(errorBlock);
    }

    return modalBlock;
  }

  function createModalDelete(client) {
    const deleteBlock = createModal();

    deleteBlock.modalFormBlock.classList.add("modal__form--delete");

    const deleteHeading = createElem(
      "h2",
      {
        classList: ["modal__form-heading"],
        textContent: "Удалить клиента",
      },
      deleteBlock.modalFormBlock
    );
    const deleteDescription = createElem(
      "p",
      {
        classList: ["modal__form-description"],
        textContent: "Вы действительно хотите удалить данного клиента?",
      },
      deleteBlock.modalFormBlock
    );
    const deleteSubmit = createElem(
      "button",
      {
        classList: ["modal__form-submit", "modal__form-submit--delete"],
        textContent: "Удалить",
      },
      deleteBlock.modalFormBlock
    );
    const deleteCancel = createElem(
      "button",
      {
        classList: ["modal__form-cancel"],
      },
      deleteBlock.modalFormBlock
    );
    const deleteCancelText = createElem(
      "u",
      {
        textContent: "Отмена",
      },
      deleteCancel
    );

    deleteCancel.addEventListener("click", () => {
      setTimeout(() => {
        deleteBlock.modalForm.remove();
        body.classList.remove("stop");
      }, 500);

      deleteBlock.modalOpen.reverse();
    });

    deleteSubmit.addEventListener("click", async () => {
      await requestSettings("DELETE", client.id);

      setTimeout(() => {
        deleteBlock.modalForm.remove();
        body.classList.remove("stop");
      }, 500);

      deleteBlock.modalOpen.reverse();

      const response = await request();

      tableBody.innerHTML = "";
      tableBody.append(loading);
      CLIENTS.arr = response;
      render(CLIENTS.arr);
    });

    return deleteBlock;
  }

  async function render(array, config = false, prop = "headId", dir = false) {
    let copyArray = [...array];

    tableBody.innerHTML = "";

    tableBody.append(loading);
    copyArray = await filterUsers(copyArray, config);
    tableBody.append(loading);
    sortUsers(copyArray, prop, dir);

    tableBody.innerHTML = "";

    for (const user of copyArray) {
      tableBody.append(createTableRow(user));
    }
  }

  // ///////////////////////////////////////////////////////////////////////////////
  document.addEventListener("DOMContentLoaded", async () => {
    const search = headerSearch();
    const tableHeadRow = createTableHead();

    const addClient = createAddClientButton();

    tableHead.append(tableHeadRow);
    tableBody.append(loading);

    const response = await request();

    modalContainer.append(addClient);

    CLIENTS.arr = [...response];

    render(CLIENTS.arr);
  });
})();
