'use client';

type TextType = {
  title: string;
};

const zhText: TextType = {
  title: '你好',
};

const enText: TextType = {
  title: 'Hello',
};

class Text {
  private language: 'en' | 'zh';

  constructor() {
    this.language = this.getLanguage();
  }

  private getLanguage = (): 'en' | 'zh' => {
    if (navigator?.language?.includes('zh')) {
      return 'zh';
    }
    return 'en';
  };

  toggleLanguage = (): void => {
    this.language = this.language === 'en' ? 'zh' : 'en';
  };

  get content(): TextType {
    return this.language === 'en' ? enText : zhText;
  }
}

const text = new Text();
export default text;
