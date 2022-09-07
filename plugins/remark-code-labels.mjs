import { visit } from 'unist-util-visit';

export default function remarkCodeLabels() {
  return ast => visit(ast, 'code', (node, index, parent) => {
    if (!node.meta) {
      return;
    }

    if (!node.lang) {
      return;
    }

    // @TODO: this assumes the metadata contains something like `label=whatever`
    const label = node.meta.split('=')[1];
    const codeNode = { ...node };

    // wrap code node in div, insert label before code
    parent.children[index] = {
      type: 'mdxJsxFlowElement',
      name: 'div',
      attributes: [],
      children: [
        {
          type: 'mdxJsxFlowElement',
          name: 'span',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'class', value: 'code-block-label' }
          ],
          children: [{
            type: 'text',
            value: label
          }],
        },
        codeNode
      ],
    }
  });
}
