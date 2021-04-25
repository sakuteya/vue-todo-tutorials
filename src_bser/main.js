//
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}

const ITEM_MAKING_TREE = [
  {
    id: 1,
    itemName: 'tyokopan',
    material: ['pan', 'tyoko'],
    num: 2,
    state: 1,
  },
  {
    id: 2,
    itemName: 'kanpotya',
    material: ['yakusou', 'oyu'],
    num: 2,
    state: 1,
  },
]

const AREA_ITEMS = [
  {
    id: 1,
    areaName: 'tera',
    displayAreaName: '寺',
    itemNames: ['yakusou', 'garlic'],
  },
  {
    id: 2,
    areaName: 'shitamati',
    displayAreaName: '下町',
    // itemNames: ['pan', 'tyoko'],
    itemNames: ['tyoko'],
  },
  {
    id: 3,
    areaName: 'gakkou',
    displayAreaName: '学校',
    itemNames: ['pan', 'oyu'],
  },
]

var vm = new Vue({
  el: '#app',
  data: {
    todos: [],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0, label: '作業中' },
      { value: 1, label: '完了' },
    ],
    haiAll: [
      //
    ],
    makeableAll: [
      //
    ],
    // TODO:ここに置くものじゃない
    hogeZairyou: ['tyoko', 'yakusou', 'pan', 'oyu'],
    checkedAreas: [],
    areaItems: AREA_ITEMS,
    current: -1,
  },
  computed: {
    computedMakeableAll: function () {
      this.doInitAllItem()
      return this.makeableAll.filter(function (el) {
        return el.state === 1 // フィルター条件が現状ない
      }, this)
      // return this.makeableAll
    },

    computedArea: function () {
      return this.areaItems.filter(function (el) {
        // return el.areaName === 'tera'
        return true
      }, this)
      // return areaItems
    },

    computedCheckedAreasInItemNames: function () {
      return this.checkedAreasInItemNames()
    },

    computedHaiAll: function () {
      return this.haiAll.filter(function (el) {
        return el.state === 1
      }, this)
    },

    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
    },
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true,
    },
  },
  created() {
    this.todos = todoStorage.fetch()
  },
  methods: {
    // 引数：材料として使って良いすべてのアイテム（重複なし）
    // 戻り：作成可能なすべてのアイテム（重複なし）
    makeAbleItem: function (materials) {
      // TODO:フィルターの文法が間違ってる？
      return ITEM_MAKING_TREE.filter((el) => {
        const hasItem =
          materials.includes(el.material[0]) &&
          materials.includes(el.material[1])
        return hasItem
      })
    },

    checkedAreasInItemNames: function () {
      // 区域の区域オブジェクトを検索する
      const findArea = (areaName) => {
        return AREA_ITEMS.find((areaItem) => areaName === areaItem.areaName)
      }

      var view = []
      this.checkedAreas.forEach((area) => {
        console.log(area)
        view = view.concat(findArea(area).itemNames)
      })
      // console.log('view' + view)
      return Array.from(new Set(view))
    },

    // methodsAreaItems: function () {
    //   return this.areaItems.filter(function (el) {
    //     // return el.areaName === 'tera'
    //     return true
    //   }, this)
    //   // return areaItems
    // },

    doInitAllItem: function () {
      this.makeableAll = []

      // const hogeZairyou = ['tyoko', 'yakusou', 'pan', 'oyu'] // 動かしたい

      var materials = this.checkedAreasInItemNames()
      var tm = this.makeAbleItem(materials)
      // var tm = this.makeAbleItem(this.hogeZairyou)
      this.makeableAll = this.makeableAll.concat(tm)
    },
  },
}).$mount('#app')

console.log(vm)
