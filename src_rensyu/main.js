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

const PAI_ALL_TYPE = [
  'man1',
  'man2',
  'man3',
  'man4',
  'man5',
  'man6',
  'man7',
  'man8',
  'man9',
  'pin1',
  'pin2',
  'pin3',
  'pin4',
  'pin5',
  'pin6',
  'pin7',
  'pin8',
  'pin9',
  'sou1',
  'sou2',
  'sou3',
  'sou4',
  'sou5',
  'sou6',
  'sou7',
  'sou8',
  'sou9',
  'ton',
  'nan',
  'sya',
  'pei',
  'haku',
  'hatu',
  'tyun',
]

const ITEM_MAKING_TREE = [
  {
    item: 'tyokopan',
    material: ['pan', 'tyoko'],
    num: 2,
  },
]

new Vue({
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
    current: -1,
  },
  computed: {
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
    shuffle: function (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const tmp = array[i]
        array[i] = array[r]
        array[r] = tmp
      }
      console.log(array)
      return array
    },
    doInitTehai: function () {
      for (let i = 0; i < 13; i++) {
        this.haiAll[i].state = 1
      }
    },
    doInitAllPai: function () {
      this.haiAll = []
      let idCount = 0
      PAI_ALL_TYPE.forEach((paiVal) => {
        for (let i = 0; i < 4; i++) {
          this.haiAll.push({
            id: idCount++,
            value: paiVal,
            paiImg: paiVal,
            state: 0, // 山
          })
        }
      })
      this.haiAll = this.shuffle(this.haiAll)
      this.doInitTehai()
    },

    // 使用するメソッド
    doAdd: function (event, value) {
      var comment = this.$refs.comment
      if (!comment.value.length) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0,
      })
      comment.value = ''
    },
    // 状態変更
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1
    },
    // 削除
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    },
  },
}).$mount('#app')
