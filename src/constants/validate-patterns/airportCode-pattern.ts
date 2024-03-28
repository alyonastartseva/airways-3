import IValidatePattern from '@/interfaces/validate-ptterns.interface';

const airportCodePattern: Record<string, IValidatePattern> = {
  letters: {
    value: /^[A-Za-z]+$/u,
    message: 'Используйте только английские буквы',
  },
};

export default airportCodePattern;
