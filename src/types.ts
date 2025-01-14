export type KeyValueStrType = { key: string, value: string }[];

// Tipo para pasar elementos al header.

export type refInHeader = {

    modalTitle : string
    isModalOpen : boolean,
    setIsModalOpen : (isModalOpen:boolean) =>  void
} []