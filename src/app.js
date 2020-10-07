import prompts from 'prompts'
import getPrice from './modules/getPrice';

const main = async () => {
  const questions = {
    type: 'text',
    name: 'symbol',
    message: 'ชื่อย่อ'
  };
  const onCancel = prompt => {
    process.exit();
  }
  const response = await prompts(questions, { onCancel });
  const result = await getPrice(response.symbol);
  console.log(result);
  main();
};

main();