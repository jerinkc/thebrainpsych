class TextToSpeechRequest < ApplicationRecord
  enum status: { pending: 0, complete: 1 }

  validates :text, presence: true
end
