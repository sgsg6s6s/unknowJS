(function () {
  const options = {
    data() {
      return {
        formId: 'applyForm',
        managerOptions: [
          { name: 'True', value: true },
          { name: 'False', value: false },
        ],
        petOptions: [
          { name: 'Choose', value: 0 },
          { name: 'Dog', value: 1 },
          { name: 'Cat', value: 2 },
          { name: 'Pig', value: 3 },
        ],
        formData: {
          nickname: 'shig',
          age: 34,
          isManager: true,
          pet: 1
        },
      }
    },
    methods: {
      reactiveCallback() {
        this.$refs.reactiveMsg.innerText = JSON.stringify(this.formData)
      },
      updateCommitMsg() {
        console.info('updateCommitMsg')
      },
    }
  }

  const template = `
      <div
       id="app">
          <form id="applyForm">
            <label for="nickname">Nickname:</label>
            <input name="nickname" type="text" :value="formData.nickname"><br/>
            <label for="age">Age:</label>
            <input name="age" type="text" :value="formData.age"/><br />
            <label for="isManager">Manager:</label>
            <select name="isManager" v-model="formData.nickname">
              <option v-for="(item,index) in managerOptions" 
              :value="item.value">{{item.name > 0}}-{{item.value}}</option>
            </select>
            <label for="pet">Pet:</label>
            <select name="pet" v-model="formData.nickname">
              <option v-for="(item,index) in petOptions" :value="item.value">{{item.name}}</option>
            </select>
          </form>
          <button class="commit-btn" @click="updateCommitMsg">Commit</button>
          <header><h1>Reactive</h1></header>
          <div class="reactive-msg" ref="reactiveMsg">{{JSON.stringify(formData)}}</div>
          <header><h1>Commit msg</h1></header>
          <div class="commit-msg" ref="commitMsg"></div>
      </div>
  `

  console.info(formatHTML(tianmao))
  const fragment = document.createDocumentFragment()

  repalceDoubleBrace()

})()

/**
 * 替换掉字符串中的{{*}}
 * @param {*} str 
 * @param {*} db 
 */
function repalceDoubleBrace(str, db) {
  const backup = str
  const bracePeriods = getBraceParseResult(str)

  for (const period of bracePeriods) {
    const { braceStart, braceEnd, content } = period
    const matchText = backup.substring(braceStart, braceEnd)
    const value = readValueFromObject(db, content)
    if (value != void 0) {
      str = str.replace(matchText, String(value))
    }
  }

  return str
}

// console.info(repalceDoubleBrace('{{item.name}}-{{item.value}}', { item: { name: 'gg', value: 'bb' } }))
// console.info(repalceDoubleBrace('{{item.name}}-{{item.value}}', { item: { nam: 'cc', value: 'bb' } }))