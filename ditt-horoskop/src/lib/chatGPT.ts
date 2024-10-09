import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
  organization: process.env.CHATGPT_ORGANIZATION,
})

type GPTArticle = {
  content: string
}

const isArticle = (obj: any): obj is GPTArticle => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.content === 'string' &&
    typeof obj.lucky_crystal === 'string' &&
    typeof obj.lucky_number === 'number' &&
    typeof obj.lucky_color === 'string'
  )
}

export const generateHoroscope = async (
  date: string,
  sign: string,
  description: string,
): Promise<GPTArticle | false> => {
  if (process.env.NO_GENERATION === '1') {
    return {
      content: 'no generation',
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert on zodiac and horoscopes. You will provide daily horoscopes in MDX format, using a mix of Markdown and JSX. The response should include 4 paragraphs with different focuses (love life, career, well-being, etc.) and should follow proper MDX syntax. Format the content as a MDX .`,
        },
        {
          role: 'user',
          content: `Make a daily horoscope for ${date}. A ${sign} with description: ${description}. Output in MDX format, including proper Markdown headings, text, and any JSX components if needed.`,
        },
      ],
    })

    if (response.choices && response.choices.length > 0) {
      const contentString = response.choices[0].message.content
      if (!contentString) throw new Error('No message content found')
      // const jsonMatch = contentString.match(/\{[\s\S]*\}/)
      // if (!jsonMatch) throw new Error('Failed to extract JSON from response')
      const content = contentString
        .replace(/^```mdx\n/, '') // Remove opening code block
        .replace(/\n```$/, '')
      // console.log(contentString)
      // if (isArticle(content)) {
      return { content }
      // }
    }

    return false
  } catch (error) {
    console.error('Error generating article:', error)
    return false
  }
}
