
const HyperDown = require('hyperdown');

const Prism = require('prismjs');

function markdownLoader(val) {

    let parser = new HyperDown();

    let html = parser.makeHtml(val);

    html = html.replace(/(?<=

]*?>)[\s\S]*? (?=) / gi, v => {
        v = v.replace(/_&/g, ' ').replace(/"/g, '"').replace(/</g, '').replace(/&/g, '&');

        return Prism.highlight(v, Prism.languages.javascript);

    });

    return (

        `

${html}
`
    );

}

module.exports = markdownLoader;
