import html2canvas from 'html2canvas'

export const downloadChart=(DOMID,imgName="图标标题")=> {
  html2canvas(document.getElementById(DOMID)).then(canvas => {
    let saveUrl = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = saveUrl
    a.download = imgName
    a.click()
    document.body.removeChild(a)
  })
}
