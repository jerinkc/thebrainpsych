class TextToSpeechRequest < ApplicationRecord
  enum status: { pending: 0, complete: 1 }

  has_one_attached :audio
  validates :text, presence: true
end
