import { useEffect, useRef, useState, type FormEvent } from "react";
import logoSvg from "./assets/tri-sestry/logo.svg";
import pdfCoverImage from "./assets/tri-sestry/pdf-insult-30days-cover.png";
import pdfFile from "./assets/tri-sestry/pdf/insult-30days-guide.pdf";
import teamPhotoImage from "./assets/tri-sestry/team.png";
import rehabHallImage from "./assets/tri-sestry/rehab-hall.jpg";
import rehabTeamImage from "./assets/tri-sestry/rehab-team.jpg";
import rehabRoomImage from "./assets/tri-sestry/rehab-room.jpg";
import socialVkIcon from "./assets/icons/vk.svg";
import socialTelegramIcon from "./assets/icons/tg.svg";
import socialYoutubeIcon from "./assets/icons/yt.svg";
import socialOkIcon from "./assets/icons/ok.svg";
import messengerWhatsappIcon from "./assets/icons/watsapp.svg";
import messengerTelegramIcon from "./assets/icons/tg2.svg";

// ===== НАСТРОЙКИ ЛЭНДА (здесь правим пути и ссылки) =====

const LOGO_SRC = logoSvg;

const PDF_COVER_SRC = pdfCoverImage;
const PDF_FILE_HREF = pdfFile;

const TEAM_PHOTO_SRC = teamPhotoImage;

const REHAB_PHOTOS_SRCS = [
  rehabHallImage, // Ежедневные занятия
  rehabTeamImage, // Команда специалистов
  rehabRoomImage, // Проживание и уход
];

type IconLink = {
  href: string;
  ariaLabel: string;
  iconSrc?: string;
  textFallback?: string;
};

const SOCIAL_LINKS: IconLink[] = [
  {
    href: "https://vk.com/three_sisters",
    ariaLabel: "Мы во ВКонтакте",
    iconSrc: socialVkIcon,
  },
  {
    href: "https://t.me/threesistersru",
    ariaLabel: "Мы в Telegram",
    iconSrc: socialTelegramIcon,
  },
  {
    href: "https://www.youtube.com/user/ThreesistersTV",
    ariaLabel: "Мы на YouTube",
    iconSrc: socialYoutubeIcon,
  },
  {
    href: "https://ok.ru/trisestri",
    ariaLabel: "Мы в Одноклассниках",
    iconSrc: socialOkIcon,
  },
];

const MESSENGER_LINKS: IconLink[] = [
  {
    href: "https://api.whatsapp.com/send/?phone=79260957168&text=%D1%8D%D1%82%D0%BE+%D0%BD%D0%BE%D0%BC%D0%B5%D1%80+%D0%B2%D0%B0%D1%88%D0%B5%D0%B3%D0%BE+%D0%BE%D0%B1%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D1%8F%2C+%D0%BE%D0%BD+%D0%BF%D0%BE%D0%BC%D0%BE%D0%B3%D0%B0%D0%B5%D1%82+%D0%BD%D0%B0%D0%BC+%D1%81%D0%BB%D0%B5%D0%B4%D0%B8%D1%82%D1%8C+%D0%B7%D0%B0+%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%BE%D0%BC+%D0%BD%D0%B0%D1%88%D0%B5%D0%B9+%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B+WW92133342++%0A%0A%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21+%D0%A0%D0%B0%D1%81%D1%81%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5+%D0%BE+%D1%80%D0%B5%D0%B0%D0%B1%D0%B8%D0%BB%D0%B8%D1%82%D0%B0%D1%86%D0%B8%D0%B8+%D0%B2+%D0%B2%D0%B0%D1%88%D0%B5%D0%B9+%D0%BA%D0%BB%D0%B8%D0%BD%D0%B8%D0%BA%D0%B5&type=phone_number&app_absent=0",
    ariaLabel: "Написать в WhatsApp",
    iconSrc: messengerWhatsappIcon,
  },
  {
    href: "http://t.me/ThreeSistersLeadBot",
    ariaLabel: "Написать в Telegram",
    iconSrc: messengerTelegramIcon,
  },
];

// ===== Дальше идут типы и сам компонент =====
export default function PdfLandingHero() {
  const logoSrc = LOGO_SRC;
  const pdfCoverSrc = PDF_COVER_SRC;
  const pdfFileHref = PDF_FILE_HREF;
  const teamPhotoSrc = TEAM_PHOTO_SRC;
  const rehabPhotosSrcs = REHAB_PHOTOS_SRCS;
  const resolvedSocialLinks = SOCIAL_LINKS;
  const resolvedMessengerLinks = MESSENGER_LINKS;

  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const [heroTextHeight, setHeroTextHeight] = useState<number | null>(null);

  // --- состояние поп-апа консультации ---
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [formSource, setFormSource] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const openConsultationModal = (source: string) => {
    setIsConsultationModalOpen(true);
    setFormSource(source);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateHeroTextHeight = () => {
      if (heroTextRef.current) {
        setHeroTextHeight(heroTextRef.current.getBoundingClientRect().height);
      }
    };

    updateHeroTextHeight();

    const element = heroTextRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (element && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateHeroTextHeight);
      resizeObserver.observe(element);
    }

    window.addEventListener("resize", updateHeroTextHeight);

    return () => {
      window.removeEventListener("resize", updateHeroTextHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  // закрытие поп-апа по Escape
  useEffect(() => {
    if (!isConsultationModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeConsultationModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConsultationModalOpen]);

  const heroImageMaxHeight = heroTextHeight ?? undefined;

  // отправка формы консультации
  const handleConsultationSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!fullName.trim() || !phone.trim() || !isConsentChecked || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload: Record<string, unknown> = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      consent: isConsentChecked,
      formName: "consultation_popup_insult_guide",
      formSource,
      source: "tri-sestry_insult_guide_landing",
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      payload.pageUrl = window.location.href;
      payload.pageTitle = document.title;
      payload.userAgent = window.navigator.userAgent;
      payload.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      payload.search = window.location.search;
    }

    try {
      const response = await fetch(
        "https://dlavsegoa10.fvds.ru/nathan/webhook/78c29c29-4e5d-4ebb-84f4-036f397a9479",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Ответ сервера ${response.status}`);
      }

      setSubmitSuccess(true);
      setFullName("");
      setPhone("");
      setIsConsentChecked(false);
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setSubmitError(
        "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по телефону."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConsultationModal = () => {
    if (!isConsultationModalOpen) return null;

    return (
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
        onClick={closeConsultationModal}
      >
        <div
          className="relative w-full max-w-3xl rounded-xl bg-[#fdfdfc] text-[#080f2a] shadow-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeConsultationModal}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ded7d4] text-lg leading-none text-[#080f2a]/70 hover:bg-[#f3ece4] cursor-pointer"
            aria-label="Закрыть форму"
          >
            ×
          </button>

          <div className="grid gap-0 md:grid-cols-2">
            {/* Левая колонка — форма */}
            <div className="border-b border-[#ded7d4] px-5 py-6 sm:px-6 sm:py-7 md:border-b-0 md:border-r">
              <h2 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                Задать вопросы о реабилитации
              </h2>

              <form
                className="mt-5 space-y-4"
                onSubmit={handleConsultationSubmit}
              >
                <div className="space-y-1.5">
                  <label
                    htmlFor="consultation-full-name"
                    className="text-xs font-medium text-[#080f2a]/80 sm:text-[13px]"
                  >
                    Имя и фамилия
                  </label>
                  <input
                    id="consultation-full-name"
                    type="text"
                    autoComplete="name"
                    className="w-full rounded-md border border-[#ded7d4] bg-[#fdfdfc] px-3 py-2 text-sm outline-none placeholder:text-[#080f2a]/40 focus:border-[#141390] focus:ring-1 focus:ring-[#141390]"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="consultation-phone"
                    className="text-xs font-medium text-[#080f2a]/80 sm:text-[13px]"
                  >
                    Телефон
                  </label>
                  <input
                    id="consultation-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+7"
                    className="w-full rounded-md border border-[#ded7d4] bg-[#fdfdfc] px-3 py-2 text-sm outline-none placeholder:text-[#080f2a]/40 focus:border-[#141390] focus:ring-1 focus:ring-[#141390]"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>

                <label className="flex items-start gap-2 text-[11px] leading-snug text-[#080f2a]/75 sm:text-[12px]">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 flex-none rounded border-[#c9c1be] text-[#141390] focus:ring-[#141390]"
                    checked={isConsentChecked}
                    onChange={(event) =>
                      setIsConsentChecked(event.target.checked)
                    }
                    required
                  />
                  <span>
                    Я соглашаюсь с{" "}
                    <a
                      href="https://three-sisters.ru/documents/politika-obrabotki-personal-nyh-dannyh"
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      политикой обработки персональных данных
                    </a>
                    .
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isConsentChecked ||
                    !fullName.trim() ||
                    !phone.trim()
                  }
                  className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-[#1716b7] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#141390] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141390] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfc] cursor-pointer"
                >
                  {isSubmitting ? "Отправляем..." : "Отправить"}
                </button>

                {submitError && (
                  <p className="text-[11px] text-red-600">{submitError}</p>
                )}
                {submitSuccess && (
                  <p className="text-[11px] text-[#43524a]">
                    Спасибо! Мы получили вашу заявку и скоро свяжемся с вами.
                  </p>
                )}
              </form>
            </div>

            {/* Правая колонка — текст и мессенджеры */}
            <div className="px-5 py-6 sm:px-6 sm:py-7">
              <p className="text-sm leading-relaxed text-[#080f2a]/90">
                Мы перезвоним и расскажем о реабилитации всё, что важно в вашей
                ситуации.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#080f2a]/90">
                Вы можете позвонить нам сами:
              </p>
              <a
                href="tel:+74954886689"
                className="mt-1 inline-flex text-base font-semibold text-[#141390]"
              >
                +7 495 488-66-89
              </a>
              <p className="mt-4 text-sm leading-relaxed text-[#080f2a]/90">
                или написать в мессенджеры:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {resolvedMessengerLinks.map((item) => (
                  <a
                    key={item.ariaLabel}
                    href={item.href}
                    aria-label={item.ariaLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ded7d4] bg-[#fdfdfc] transition hover:bg-[#f3ece4] cursor-pointer"
                  >
                    {item.iconSrc ? (
                      <img src={item.iconSrc} alt="" className="h-5 w-5" />
                    ) : (
                      <span className="text-xs font-semibold text-[#080f2a]/80">
                        {item.textFallback ?? ""}
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-[#080f2a]/70">
                Консультация бесплатная. Специалист уточнит детали и подскажет,
                какие шаги лучше всего подойдут в вашей ситуации.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3ece4] text-[#080f2a]">
      {/* Хедер */}
      <header className="bg-[#fdfdfc] border-b border-[#ded7d4]">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 lg:py-4">
          {/* Логотип: либо файл, либо заглушка */}
          <div className="flex items-center gap-3">
            <a href="https://three-sisters.ru" className="inline-flex items-center cursor-pointer">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Клиника ранней реабилитации «Три сестры»"
                  className="h-9 w-auto"
                />
              ) : (
                <div className="flex h-9 w-16 items-center justify-center rounded-full border border-[#080f2a]/15 bg-[#f3ece4]/60">
                  <span className="text-[10px] font-semibold tracking-tight text-[#080f2a]/60">
                    ЛОГО
                  </span>
                </div>
              )}
            </a>
          </div>

          <div className="ml-auto flex items-center justify-end">
            <button
              className="rounded-md bg-[#1716b7] px-4 py-2 text-[11px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#141390] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141390] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfc] cursor-pointer"
              onClick={() =>
                openConsultationModal("header_consultation_button")
              }
            >
              Консультация со специалистом
            </button>
          </div>
        </div>
      </header>

      {/* Первый экран: PDF-руководство */}
      <main>
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:items-stretch lg:py-16">
          {/* Левая колонка с текстом */}
          <div
            ref={heroTextRef}
            className="flex flex-col flex-1 gap-6 lg:max-w-xl"
          >
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#43524a]">
                бесплатное руководство
              </p>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Если у близкого инсульт: что делать в первые 30 дней
              </h1>
            </div>

            <p className="max-w-prose text-sm leading-relaxed text-[#080f2a]/90 sm:text-base">
              Инструкция для родственников:
            </p>

            <div className="lg:hidden">
              <div className="flex h-[260px] w-full items-center justify-start sm:h-[320px]">
                {pdfCoverSrc ? (
                  <img
                    src={pdfCoverSrc}
                    alt="Обложка PDF-гида «Если у близкого инсульт»"
                    className="h-full w-auto max-w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-dashed border-[#43524a]/30 bg-[#fdfdfc]/40 text-xs text-[#43524a]/80">
                    Обложка PDF-гида
                  </div>
                )}
              </div>
            </div>

            <div className="order-3 flex flex-wrap items-center gap-3 lg:order-4">
              <a
                href={pdfFileHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-[#1716b7] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#141390] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141390] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3ece4] cursor-pointer"
              >
                Скачать PDF-гайд
              </a>
              <p className="text-xs text-[#080f2a]/70">
                Бесплатно · PDF, 31 страница · Можно переслать родственникам
              </p>
            </div>

            <ul className="order-4 space-y-2 text-sm leading-relaxed text-[#080f2a]/90 lg:order-3">
              {[
                "С какими проблемами сталкиваются пациенты и как они решаются;",
                "Когда начинать реабилитацию и как не упустить время;",
                "Как выбрать клинику для реабилитации;",
                "Какие специалисты помогают восстановиться после инсульта.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.45em] h-2 w-2 flex-none rounded-full bg-[#6098ff]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Правая колонка — место под визуализацию PDF */}
          <div className="hidden flex-1 lg:flex lg:items-stretch">
            <div
              className="flex h-[260px] w-full items-center justify-center sm:h-[320px] lg:h-auto"
              style={
                heroImageMaxHeight ? { maxHeight: heroImageMaxHeight } : undefined
              }
            >
              {pdfCoverSrc ? (
                <img
                  src={pdfCoverSrc}
                  alt="Обложка PDF-гида «Если у близкого инсульт»"
                  className="h-full w-auto max-w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center border border-dashed border-[#43524a]/30 bg-[#fdfdfc]/40 text-xs text-[#43524a]/80">
                  Обложка PDF-гида
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Блок 2: кто стоит за гайдом */}
        <section className="mx-auto max-w-6xl px-4 pb-12 lg:pb-16">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg bg-[#fdfdfc] shadow-sm shadow-black/5">
              {teamPhotoSrc ? (
                <img
                  src={teamPhotoSrc}
                  alt="Команда клиники «Три сестры»"
                  className="w-full h-auto"
                />
              ) : (
                <div className="flex w-full items-center justify-center border border-dashed border-[#43524a]/25 py-16 text-xs text-[#43524a]/70 sm:py-20 sm:text-[13px]">
                  Здесь будет фотография команды «Трёх сестёр»
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-5 lg:items-start">
              <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-[26px] lg:col-span-2">
                Руководство подготовили специалисты клиники «Три сестры»
              </h2>

              <p className="text-sm leading-relaxed text-[#080f2a]/90 sm:text-base lg:col-span-3">
                Клиника помогает восстанавливаться после инсультов, травм,
                операций. Мы работаем с пациентами с 0 лет и принимаем даже
                тяжелых пациентов, чтобы люди снова могли говорить, есть,
                гулять, жить без помощи близких.
              </p>
            </div>

            <div className="mt-6 grid w-full gap-6 md:grid-cols-3">
              {[
                {
                  title: "Ранняя реабилитация — профиль клиники",
                  text: "Чем раньше пациенты начинают реабилитацию, тем больше функций восстанавливается",
                },
                {
                  title: "Работаем по международным стандартам",
                  text: "Используем только методы, которые доказали свою эффективность, постоянно учимся и читаем самую новую информацию о реабилитации",
                },
                {
                  title: "Обеспечиваем уход и комфортные условия",
                  text: "Помощники по уходу, медсестры, реабилитологи — пациенты всегда под присмотром и получают все необходимые услуги",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg bg-[#fdfdfc] px-4 py-3 shadow-sm shadow-black/5"
                >
                  <p className="mb-1 text-sm font-semibold text-[#080f2a]">
                    {item.title}
                  </p>
                  <p className="text-xs leading-relaxed text-[#080f2a]/90 sm:text-[13px]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Блок 3: консультация */}
        <section className="mx-auto max-w-6xl px-4 pb-14 lg:pb-20">
          <div className="rounded-xl bg-[#fdfdfc] px-4 py-6 shadow-sm shadow-black/5 sm:px-6 sm:py-8">
            <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
              <div className="space-y-4 lg:col-span-2">
                <h3 className="text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
                  Позвоните в клинику, чтобы узнать, как действовать именно в
                  вашей ситуации
                </h3>
                <p className="text-sm leading-relaxed text-[#080f2a]/90 sm:text-base">
                  Специалист клиники расспросит вас о состоянии пациента,
                  предложит план действий и сориентирует по стоимости
                  реабилитации. Вот, что обычно спрашивают у нас на
                  консультации:
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-[#080f2a]/90">
                  {[
                    "Сколько стоит реабилитация и что входит в стоимость.",
                    "Как узнать прогноз восстановления.",
                    "Как строится расписание на день, какие занятия получит пациент.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.45em] h-2 w-2 flex-none rounded-full bg-[#6098ff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#ded7d4] bg-[#fdfdfc] px-4 py-4 sm:px-5 sm:py-5 lg:ml-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#43524a]">
                  Бесплатная консультация
                </p>
                <p className="mt-2 text-sm font-medium text-[#080f2a]">
                  30–40 минут, по телефону или онлайн
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#080f2a]/80 sm:text-[13px]">
                  Обсудим вашу ситуацию, поможем понять, какие шаги реалистичны.
                </p>
                <button
                  className="mt-4 w-full rounded-md bg-[#1716b7] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#141390] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141390] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fdfdfc] cursor-pointer"
                  onClick={() =>
                    openConsultationModal("consultation_card_button")
                  }
                >
                  Записаться на консультацию
                </button>
                <p className="mt-2 text-[11px] leading-relaxed text-[#080f2a]/70">
                  Оставьте контакты — администратор свяжется с вами и подберёт
                  удобное время.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Блок 4: кратко о реабилитации в клинике */}
        <section className="mx-auto max-w-6xl px-4 pb-16 lg:pb-20">
          <div className="space-y-6">
            <div className="max-w-4xl space-y-3">
              <h3 className="text-2xl font-semibold leading-snug tracking-tight sm:text-[26px]">
                Интенсивные занятия и комфортные условия
              </h3>
              <p className="text-sm leading-relaxed text-[#080f2a]/90 sm:text-base">
                В «Трёх сёстрах» пациенты проходят по 4–6 часов занятий в день и
                работают со специалистами даже в выходные дни. С каждым
                пациентом работает команда: лечащий врач, физические терапевты,
                логопеды, эрготерапевты, акватерапевты, нейропсихологи, тазовые
                терапевты. Условия пребывания разработаны так, чтобы пациенты
                чувствовали себя как в отеле: комфортные палаты, зоны отдыха,
                вкусная еда в ресторане.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Ежедневные занятия",
                  text: "4–6 часов индивидуальных и групповых занятий в день: работа с движением, речью, когнитивными функциями и самообслуживанием.",
                },
                {
                  title: "Команда специалистов",
                  text: "Физические терапевты, логопеды, нейропсихологи, врачи и другие специалисты работают с одним пациентом как единая команда.",
                },
                {
                  title: "Проживание и уход",
                  text: "Проживание в клинике, питание, лекарства и круглосуточный уход уже входят в программу. Помогаем подготовиться к возвращению домой.",
                },
              ].map((item, index) => {
                const src = rehabPhotosSrcs && rehabPhotosSrcs[index];
                return (
                  <div
                    key={item.title}
                    className="flex flex-col overflow-hidden rounded-lg bg-[#fdfdfc] shadow-sm shadow-black/5"
                  >
                    <div className="aspect-[4/3] w-full bg-[#f3ece4]">
                      {src ? (
                        <img
                          src={src}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center border border-dashed border-[#43524a]/25 text-[11px] text-[#43524a]/70">
                          Фото клиники
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 sm:px-5 sm:py-4">
                      <p className="text-sm font-semibold text-[#080f2a]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#080f2a]/90 sm:text-[13px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="https://three-sisters.ru/reabilitatsiya/insult"
                className="inline-flex items-center justify-center rounded-md bg-[#1716b7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#141390] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141390] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3ece4] cursor-pointer"
              >
                Подробнее о реабилитации в стационаре
              </a>
              <p className="text-xs text-[#080f2a]/70 sm:text-[13px]">
                Подробно о программах, примерах результатов, стоимости и
                условиях пребывания.
              </p>
            </div>
          </div>
        </section>

        {/* Футер */}
        <footer className="mt-auto bg-[#43524a] text-[#fdfdfc]">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="sm|max-w-xs">
                <a href="https://three-sisters.ru" className="inline-flex items-center cursor-pointer">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt="Клиника ранней реабилитации «Три сестры»"
                      className="h-10 w-auto brightness-0 invert"
                    />
                  ) : (
                    <p className="text-2xl font-semibold leading-snug text-[#fdfdfc]">
                      Три сестры
                    </p>
                  )}
                </a>
              </div>
              <div className="flex-1 space-y-5 text-sm sm:text-[15px]">
                <div className="space-y-2 sm:max-w-xl">
                  <p className="font-medium text-[#dec297]">
                    Клиника ранней реабилитации «Три сестры»
                  </p>
                  <p className="leading-relaxed">
                    Московская область, городской округ Лосино-Петровский,
                    деревня Райки, улица Чеховская, дом 1.{" "}
                    <a
                      href="https://three-sisters.ru/reabilitatsiya/insult"
                      className="text-[#dec297] underline underline-offset-2 hover:no-underline"
                    >
                      Подробнее о клинике
                    </a>
                  </p>
                  <p className="text-xs leading-relaxed text-[#fdfdfc]/80 sm:text-[13px]">
                    Работаем с пациентами после инсульта, травм и других
                    неврологических и ортопедических состояний.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-[#dec297]">
                    Подпишитесь на наши соцсети
                  </p>
                  <p className="text-xs leading-relaxed text-[#fdfdfc]/85 sm:text-[13px]">
                    Мы даём советы по реабилитации, делимся историями пациентов
                    и рассказываем о клинике.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {resolvedSocialLinks.map((item) => (
                      <a
                        key={item.ariaLabel}
                        href={item.href}
                        aria-label={item.ariaLabel}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dec297] text-xs font-semibold text-[#43524a] transition hover:bg-[#fdfdfc] hover:text-[#43524a] cursor-pointer"
                      >
                        {item.iconSrc ? (
                          <img src={item.iconSrc} alt="" className="h-5 w-5" />
                        ) : (
                          <span>{item.textFallback ?? ""}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-sm sm:text-base">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[#fdfdfc]">Свяжитесь с нами</span>
                    <a
                      href="tel:+74954886689"
                      className="font-semibold text-[#fdfdfc]"
                    >
                      +7 495 488-66-89
                    </a>
                    <div className="flex items-center gap-2">
                      {resolvedMessengerLinks.map((item) => (
                        <a
                          key={item.ariaLabel}
                          href={item.href}
                          aria-label={item.ariaLabel}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#fdfdfc]/60 text-[11px] font-semibold text-[#fdfdfc] transition hover:bg-[#fdfdfc] hover:text-[#43524a] cursor-pointer"
                        >
                          {item.iconSrc ? (
                            <img
                              src={item.iconSrc}
                              alt=""
                              className="h-4 w-4"
                              style={{ filter: "brightness(0) invert(1)" }}
                            />
                          ) : (
                            <span>{item.textFallback ?? ""}</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {renderConsultationModal()}
    </div>
  );
}
